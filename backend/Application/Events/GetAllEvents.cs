using Application.Core;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Net;

namespace Application.Events
{
    public class GetAllEvents
    {
        public class Query : IRequest<PagedList<EventDto>> 
        { 
            public EventParams? Params { get; set; }
        }

        public class IHandler : IRequestHandler<Query, PagedList<EventDto>>
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

            public async Task<PagedList<EventDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                         .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                if (user is null) throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var query =  _context.Events
                   .Where(e =>e.Attendees.Any(a => a.AppUser.UserName == user.UserName))
                   .OrderBy(d => d.CreatedDate)
                   .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
                   .AsQueryable();

                if (!String.IsNullOrEmpty(request.Params.Title))
                {
                    query = query.Where(x => x.Title.ToLower().Contains(request.Params.Title.ToLower()));
                }
                if (!String.IsNullOrEmpty(request.Params.Location))
                {
                    query = query.Where(x => x.Location.ToLower().Contains(request.Params.Location.ToLower()));
                }
                if (request.Params.StartDate.HasValue && request.Params.EndDate.HasValue)
                {
                    query = query.Where(x => x.StartDate >= request.Params.StartDate.Value
                                                  && x.EndDate <= request.Params.EndDate.Value);
                }
                if (request.Params.StartDate.HasValue)
                {
                    query = query.Where(x => x.StartDate >= request.Params.StartDate.Value);
                }
                if (request.Params.EndDate.HasValue)
                {
                    query = query.Where(x => x.EndDate <= request.Params.EndDate.Value);
                }

                var events = await PagedList<EventDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

                return events;
            }
        }
    }
}
