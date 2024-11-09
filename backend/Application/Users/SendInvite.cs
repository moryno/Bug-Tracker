using Application.Errors;
using Application.Interfaces;
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
    public class SendInvite
    {
        public class Command : IRequest<string>
        {
            public string FirstName { get; set; } = string.Empty;
            public string LastName { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string RoleName { get; set; } = string.Empty;
            public string Message { get; set; } = string.Empty;
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.FirstName).NotEmpty();
                RuleFor(x => x.LastName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.RoleName);
            }
        }

        public class Handler : IRequestHandler<Command, string>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            private readonly IEmailSender _emailSender;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(
                DataContext context, 
                IUserAccessor userAccessor, 
                UserManager<AppUser> userManager,
                IEmailSender emailSender,
                IHttpContextAccessor httpContextAccessor
                )
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
                _emailSender = emailSender;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
            
                var admin = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (admin == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                bool emailExistsInCompany = await _context.Users
                                            .Where(x => x.Email == request.Email && x.CompanyId == admin.CompanyId)
                                            .AnyAsync();

                if (emailExistsInCompany)
                    throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists within the company." });

                var company = await _context.Companies.FindAsync(admin.CompanyId);
                if (company == null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "No company can be found for the inviter" });

                AppUser user = new()
                {
                    Email = request.Email,
                    UserName = $"{request.FirstName.ToLower()}.{request.LastName.ToLower()}",
                    DisplayName = $"{request.FirstName} {request.LastName}",
                    CompanyId = company.Id,
                    Status = true,
                    LastActive = DateTime.Now,
                    DateAdded = DateTime.Now,
                };
                string tempPassword = $"86#{request.LastName}^@";

                var result = await _userManager.CreateAsync(user, tempPassword);

                if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { error = "Problem registering user" });

                var roleAssignResult = await _userManager.AddToRoleAsync(user, request.RoleName);
                if (!roleAssignResult.Succeeded)
                    throw new Exception("Problem assigning role");

                //Verfiy email
                string origin = _httpContextAccessor.HttpContext.Request.Headers["origin"].ToString();
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                string verifyUrl = $"{origin}/auth/verifyEmail?token={token}&email={user.Email}";
                string message = GetHtmlcontent(request.LastName, company.Name, request.RoleName, verifyUrl, admin.DisplayName, tempPassword);

                MailSettings mail = new()
                {
                    ToEmail = user.Email,
                    Subject = $"[Invite] Invitation to Join {company.Name} as {request.RoleName}",
                    Body = message
                };

                await _emailSender.SendMailAsync(mail);


                return "Send invite success - please verify email";
            }
        }
        private static string GetHtmlcontent(string lastName, string companyName, string roleName, string verifyUrl, string senderName, string tempPassword)
        {
            string Response = "<div style=\"width:100%;background-color:lightblue;text-align:center;margin:10px\">";
            Response += $"<h4>Dear {lastName},</h4>";
            Response += $"<br />";
            Response += $"I hope this email finds you well.";
            Response += $"<br />";    
            Response += $"We are excited to extend an invitation to you to join {companyName} as a {roleName}. We believe that you <br />";
            Response += $"would be a great fit for our team and contribute significantly to the success of {companyName}.";
            Response += $"<br />";
            Response += $"To formally accept this invitation and begin the onboarding process, please click the link below and use this temporary password {tempPassword}:";
            Response += $"<br />";
            Response += $"<p><a href='{verifyUrl}'>Click to accept invite.</a></p>";
            Response += $"<br />";
            Response += "<p>If you have any questions or need additional information, feel free to reach out. We look forward to <br /></p>";
            Response += "welcoming you to the team!";
            Response += $"<br />";
            Response += $"<br />";
            Response += "Best regards, <br />";
            Response += $"{senderName}";

            return Response;
        }
    }
}
