using Application.Core;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class GetSearchEvent
    {
        public class Query : IRequest<PagedList<EventSearchDto>>
        {
            public EventParams? Params { get; set; }
        }

        public class IHandler : IRequestHandler<Query, PagedList<EventSearchDto>>
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

            public async Task<PagedList<EventSearchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                         .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                if (user is null) throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var query = _context.Events
                   .Where(e => e.Attendees.Any(a => a.AppUser.UserName == user.UserName))
                   .OrderBy(d => d.CreatedDate)
                   .ProjectTo<EventSearchDto>(_mapper.ConfigurationProvider)
                   .AsQueryable();

                if (!String.IsNullOrEmpty(request.Params.Title))
                {
                    query = query.Where(x => x.Title.ToLower().Contains(request.Params.Title.ToLower()));
                }

                var events = await PagedList<EventSearchDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

                return events;
            }
        }
    }
}
