using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Notifications
{
    public class GetNotification
    {
        public class Query : IRequest<List<NotificationDto>>
        {
            public string UserName { get; set; } = string.Empty;
        }
        public class IHandler : IRequestHandler<Query, List<NotificationDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public IHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<List<NotificationDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                         .FirstOrDefaultAsync(x => x.UserName == request.UserName);
                if (user is null) throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var notifications = await _context.Notifications
                    .Where(n => n.Recipient.UserName == user.UserName && !n.IsRead)
                    .ToListAsync();

                return _mapper.Map<List<NotificationDto>>(notifications);
            }
        }
    }
}
