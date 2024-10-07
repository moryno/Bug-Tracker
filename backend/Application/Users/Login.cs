using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System.Net;

namespace Application.Users
{
    public class Login
    {
        public class Query : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }    
            
        }
        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator() {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Query, User>
        {

            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly DataContext _context;

            public Handler(UserManager<AppUser> userManager,  SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator, DataContext context)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _jwtGenerator = jwtGenerator;
                _context = context;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                if(!user.EmailConfirmed)
                    throw new RestException(HttpStatusCode.Unauthorized, new { error = "Email not confirmed. Please confirm email first." });

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
                if (result.Succeeded)
                {
                    user.LastActive = DateTime.Now;
                    await _context.SaveChangesAsync();

                    var company = await _context.Companies.
                        FindAsync(user.CompanyId);
                    var roles = await _userManager.GetRolesAsync(user);

                    return new User
                    {
                        Email = user.Email,
                        FullName = user.DisplayName,
                        UserName = user.UserName,
                        Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                        Token = await _jwtGenerator.CreateToken(user),
                        Roles = roles.ToList(),
                        CompanyName = company?.Name,
                        CompanyId = company.Id,
                        Status = user.Status,
                        LastActive = user.LastActive
                    };
                }
                
                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}