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

namespace Application.Bugs
{
    public class GetAll 
    {
        public class Query : IRequest<PagedList<BugDto>> 
        { 
            public BugParams? Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, PagedList<BugDto>> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<PagedList<BugDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var query = _context.Bugs
                    .Where(x => x.CompanyId == user.CompanyId)
                    .Include(b => b.BugAssignees)
                    .OrderBy(d => d.CreatedDate)
                    .ProjectTo<BugDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (!String.IsNullOrEmpty(request.Params.BugName))
                {
                    query = query.Where(x => x.BugName.ToLower().Contains(request.Params.BugName.ToLower()));
                }
                if(request.Params.ProjectId != Guid.Empty)
                {
                    query = query.Where(x => x.ProjectId == request.Params.ProjectId);
                }
                if (!String.IsNullOrEmpty(request.Params.Severity))
                {
                    query = query.Where(x => x.Severity == request.Params.Severity);
                }
                if (!String.IsNullOrEmpty(request.Params.Classification))
                {
                    query = query.Where(x => x.Classification == request.Params.Classification);
                }
                if (!String.IsNullOrEmpty(request.Params.BugStatus))
                {
                    query = query.Where(x => x.BugStatus == request.Params.BugStatus);
                }
                if (request.Params.DueDate.HasValue)
                {
                    query = query.Where(x => x.DueDate >= request.Params.DueDate.Value);
                }
                if(!String.IsNullOrEmpty(request.Params.Assignee))
                {
                    query = query.Where(x => x.BugAssignees.Any(ba => request.Params.Assignee == ba.UserName));
                }
                if(request.Params.UnAssigneed)
                {
                    query = query.Where(x => !x.BugAssignees.Any());
                }

                var bugs =  await PagedList<BugDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

                return bugs;
            }
        }
    }
}
