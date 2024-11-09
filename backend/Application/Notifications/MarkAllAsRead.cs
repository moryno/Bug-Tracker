using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Notifications
{
    public class MarkAllAsRead
    {
        public class Command : IRequest
        {
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

                var notifications = await _context.Notifications
                            .Where(n => n.RecipientId == user.Id && !n.IsRead)
                            .ToListAsync();

                if (!notifications.Any()) throw new RestException(HttpStatusCode.NotFound, new { error = "No unread notifications found." });

                foreach (var notification in notifications)
                {
                    notification.IsRead = true;
                    notification.ReadAt = DateTime.UtcNow;

                }
               

               
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem updating notification");
            }
        }
    }
}
