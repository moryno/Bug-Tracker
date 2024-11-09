using Application.Core;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Projects
{
    public class GetSearchProjects
    {
        public class Query : IRequest<PagedList<ProjectSearchDto>> 
        {
            public ProjectParams? Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, PagedList<ProjectSearchDto>>
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

            public async Task<PagedList<ProjectSearchDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var today = DateTime.UtcNow.Date;

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var quariable = _context.Projects
                    .Where(x => x.CompanyId == user.CompanyId)
                    .OrderBy(d => d.CreatedDate)
                    .ProjectTo<ProjectSearchDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (!String.IsNullOrEmpty(request.Params.ProjectName))
                {
                    quariable = quariable.Where(x => x.ProjectName.ToLower().Contains(request.Params.ProjectName.ToLower()));
                }

                var projects = await PagedList<ProjectSearchDto>.CreateAsync(quariable, request.Params.PageNumber, request.Params.PageSize);

                return projects;
            }
        }
    }
}
