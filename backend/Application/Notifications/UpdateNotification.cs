using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Notifications
{
    public class UpdateNotification
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                         .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user is null) throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var notification = await _context.Notifications
                            .FirstOrDefaultAsync(n => n.Id == request.Id && n.RecipientId == user.Id);

                if (notification is null) throw new RestException(HttpStatusCode.NotFound, new { error = "No unread notification found." });

                notification.IsRead = true;
                notification.ReadAt = DateTime.UtcNow;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem updating notification");
            }
        }
    }
}
