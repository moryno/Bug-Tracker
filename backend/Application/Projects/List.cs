using Application.Core;
using Application.Errors;
using Application.Interfaces;
using Application.Projects;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

public class List
{
    public class Query : IRequest<PagedList<ProjectDto>>
    { 
        public ProjectParams? Params { get; set; }
    }
    public class Handler : IRequestHandler<Query, PagedList<ProjectDto>>
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

        public async Task<PagedList<ProjectDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var today = DateTime.UtcNow.Date;

            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
            if (user == null)
                throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

            var quariable = _context.Projects
                .Where(x => x.CompanyId == user.CompanyId)
                .OrderBy(d => d.CreatedDate)
                .ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            if (!String.IsNullOrEmpty(request.Params.ProjectName))
            {
                quariable = quariable.Where(x => x.ProjectName.ToLower().Contains(request.Params.ProjectName.ToLower()));
            }
            if (!String.IsNullOrEmpty(request.Params.Priority))
            {
                quariable = quariable.Where(x => x.Priority.ToLower() == request.Params.Priority.ToLower());
            }
            if (!String.IsNullOrEmpty(request.Params.ProjectGroup))
            {
                quariable = quariable.Where(x => x.ProjectGroup == request.Params.ProjectGroup);
            }
            if (!String.IsNullOrEmpty(request.Params.Owner))
            {
                quariable = quariable.Where(x => x.UserName == request.Params.Owner);
            }
            if (request.Params.StartDate.HasValue && request.Params.EndDate.HasValue)
            {
                quariable = quariable.Where(x => x.StartDate >= request.Params.StartDate.Value
                                              && x.EndDate <= request.Params.EndDate.Value);
            }
            if (request.Params.StartDate.HasValue)
            {
                quariable = quariable.Where(x => x.StartDate >= request.Params.StartDate.Value);
            }
            if (request.Params.EndDate.HasValue)
            {
                quariable = quariable.Where(x => x.EndDate <= request.Params.EndDate.Value);
            }
            if (!String.IsNullOrEmpty(request.Params.CurrentStatus))
            {
                quariable = quariable.Where(x => x.CurrentStatus == request.Params.CurrentStatus);
            }     
            if (!String.IsNullOrEmpty(request.Params.ProjectStatus))
            {
                quariable = quariable.Where(x => x.ProjectStatus == (double)100);
            }
            if (!String.IsNullOrEmpty(request.Params.IsActive))
            {
                var active = request.Params.IsActive == "True" ? true : false;
                if (active)
                {
                    quariable = quariable.Where(p => p.StartDate <= today && p.EndDate >= today);
                } 
                else
                {
                    quariable = quariable.Where(x => x.EndDate < today || x.StartDate > today);
                }
                
            }

            var projects = await PagedList<ProjectDto>.CreateAsync(quariable, request.Params.PageNumber, request.Params.PageSize);

            return projects;
        }
    }
}