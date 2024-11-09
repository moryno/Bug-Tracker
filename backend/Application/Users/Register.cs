using Application.Errors;
using Application.Interfaces;
using Application.Validators;
using Azure.Core;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;
using System.Text;

namespace Application.Users
{
    public class Register
    {
        public class Command : IRequest<string>
        {
            public string FullName { get; set; } = string.Empty;
            public string UserName { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public string CompanyName { get; set; } = string.Empty;
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FullName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
                RuleFor(x => x.CompanyName).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly IEmailSender _emailSender;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(
                DataContext context,
                UserManager<AppUser> userManager,
                RoleManager<AppRole> roleManager,
                IJwtGenerator jwtGenerator,
                IEmailSender emailSender,
                IHttpContextAccessor httpContextAccessor
                )
            {
                _context = context;
                _userManager = userManager;
                _roleManager = roleManager;
                _emailSender = emailSender;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                if (await _context.Users.Where(x => x.Email == request.Email).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });
                if (await _context.Users.Where(x => x.UserName == request.UserName).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { UserName = "Username already exists" });

                var company = await _context.Companies.SingleOrDefaultAsync(c => c.Name == request.CompanyName);
                if (company != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Company already exists" });
                

                 company = new Company
                    {
                        Name = request.CompanyName
                    };

                    _context.Companies.Add(company);
                    await _context.SaveChangesAsync();
                

                AppUser user = new()
                {
                    Email = request.Email,
                    UserName = request.UserName,
                    DisplayName = request.FullName,
                    CompanyId = company.Id,
                    Status = true,
                    LastActive = DateTime.Now,
                    DateAdded = DateTime.Now,
                };

                var result = await _userManager.CreateAsync(user, request.Password);

                if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { error = "Problem registering user" });

                var adminRole = await _context.Roles
                                .OfType<AppRole>()
                                .SingleOrDefaultAsync(r => r.Name == "Admin");

                if (adminRole == null)
                {
                    adminRole = new AppRole
                    {
                        Name = "Admin",
                        CompanyId = company.Id,
                        CreatedDate = DateTime.Now,
                        CreatedUser = user.DisplayName,
                        UpdatedDate = DateTime.Now,
                        UpdatedUser = user.DisplayName,
                    };

                    var roleResult = await _roleManager.CreateAsync(adminRole);
                    if (!roleResult.Succeeded)
                        throw new Exception("Problem creating Admin role");
                }

                // Assign "Admin" role to the user
                var roleAssignResult = await _userManager.AddToRoleAsync(user, "Admin");
                if (!roleAssignResult.Succeeded)
                    throw new Exception("Problem assigning Admin role");

                //Verfiy email
                string origin = _httpContextAccessor.HttpContext.Request.Headers["origin"].ToString();
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                string verifyUrl = $"{origin}/auth/verifyEmail?token={token}&email={user.Email}";
                string message = $"<p>Please click the link below to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email.</a></p>";

                MailSettings mail = new()
                {
                    ToEmail = user.Email,
                    Subject = "[Email Verification] Please verify email",
                    Body = message
                };

                await _emailSender.SendMailAsync(mail);

                return "Registration success - please verify email";

          
            }
        }
    }
}