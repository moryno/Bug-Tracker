using Application.Core;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class GetSearchBugs
    {
        public class Query : IRequest<PagedList<BugSearchDto>>
        {
            public BugParams? Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, PagedList<BugSearchDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<PagedList<BugSearchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var query = _context.Bugs
                    .Where(x => x.CompanyId == user.CompanyId)
                    .Include(b => b.BugAssignees)
                    .OrderBy(d => d.CreatedDate)
                    .ProjectTo<BugSearchDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (!String.IsNullOrEmpty(request.Params.BugName))
                {
                    query = query.Where(x => x.BugName.ToLower().Contains(request.Params.BugName.ToLower()));
                }
                

                var bugs = await PagedList<BugSearchDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

                return bugs;
            }
        }
    }
}
