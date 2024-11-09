using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Notifications
{
    public class SendEmailService
    {
        public class Command : IRequest
        {
            public string RecipientId { get; set; } = string.Empty;
            public string Subject { get; set; } = string.Empty;
            public string CustomMessage { get; set; } = string.Empty;
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.RecipientId).NotEmpty().EmailAddress();
                RuleFor(x => x.Subject).NotEmpty();
                RuleFor(x => x.CustomMessage).NotEmpty();
            }
        }

        public class IHandler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IEmailSender _emailSender;
            private readonly IHttpContextAccessor _httpContextAccessor;

            public IHandler(DataContext context, IUserAccessor userAccessor, IEmailSender emailSender, IHttpContextAccessor httpContextAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _emailSender = emailSender;
                _httpContextAccessor = httpContextAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var recipient = await _context.Users
                      .FirstOrDefaultAsync(x => x.Email == request.RecipientId);

                if (recipient is null) throw new RestException(HttpStatusCode.NotFound, new { error = "Recipient not found." });

                var sender = await _context.Users
                         .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                if (sender is null) throw new RestException(HttpStatusCode.NotFound, new { error = "Sender not found." });

                MailSettings mailSettings = new ()
                {
                    ToEmail = recipient.Email,
                    Email = sender.Email,
                    DisplayName = sender.DisplayName,
                    Subject = request.Subject,
                    Body = EmailHtmlHelper.GetEmailHtmlHelper(
                      recipient.DisplayName,
                      request.CustomMessage
                    ),
                };

                await _emailSender.SendMailAsync(mailSettings);

                return Unit.Value;
            }
        }
    }
}
