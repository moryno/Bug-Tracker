using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.Net;
using System.Text;

namespace Application.Users
{
    public class VerifyEmail
    {
        public class Command: IRequest 
        {
            public string Email { get; set; } = string.Empty;
            public string Token { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> _userManager;

            public Handler(UserManager<AppUser> userManager)
            {
                _userManager = userManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);


                user.ConcurrencyStamp = null;

                var decodedTokenBytes = WebEncoders.Base64UrlDecode(request.Token);
                var decodedToken = Encoding.UTF8.GetString(decodedTokenBytes);
                var result = await _userManager.ConfirmEmailAsync(user, decodedToken);


                if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { error = "Could not verify email address." });

                return Unit.Value;
            }
        }
    }
}
