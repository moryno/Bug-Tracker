using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Net;
using System.Text;

namespace Application.Users
{
    public class ResendEmailConfirmationLink
    {
        public class Query : IRequest<string>
        {
            public string Email { get; set; }
        }

        public class Handler : IRequestHandler<Query, string>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly IEmailSender _emailSender;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public Handler(UserManager<AppUser> userManager, IEmailSender emailSender, IHttpContextAccessor httpContextAccessor)
            {
                _userManager = userManager;
                _emailSender = emailSender;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<string> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                //Verfiy email
                string origin = _httpContextAccessor.HttpContext.Request.Headers["origin"].ToString();
                var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                token = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                string verifyUrl = $"{origin}/auth/verifyEmail?token={token}&email={user.Email}";
                string message = $"<p>Please click the link below to verify your email address:</p><p><a href='{verifyUrl}'>Click to verify email.</a></p>";

                MailSettings mail = new()
                {
                    ToEmail = user.Email,
                    Subject = "[Email Verification]: Please verify email",
                    Body = message
                };

                await _emailSender.SendMailAsync(mail);

                return "Email verification link resent.";
            }
        }
    }
}
