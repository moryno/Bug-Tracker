using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class GetCalendarEvent
    {
        public class Query : IRequest<List<CalendarEventDto>>
        {
            public string UserName {  get; set; } = string.Empty;
        }

        public class IHandler : IRequestHandler<Query, List<CalendarEventDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public IHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<List<CalendarEventDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                          .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                if (user is null) throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." }); 

                var events = await _context.Events
                    .Where(e => e.Attendees.Any(a => a.AppUser.UserName == user.UserName))
                    .ToListAsync(cancellationToken: cancellationToken);

                 return _mapper.Map<List<Event>, List<CalendarEventDto>>(events);

            }
        }
    }
}
