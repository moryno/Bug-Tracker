using Application.Errors;
using Application.Interfaces;
using Application.Projects;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

public class List
{
    public class Query : IRequest<List<ProjectDto>> { }
    public class Handler : IRequestHandler<Query, List<ProjectDto>>
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

        public async Task<List<ProjectDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
            if (user == null)
                throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

            var projects = await _context.Projects
                .Where(x => x.CompanyId == user.CompanyId)
                .ToListAsync();

            return _mapper.Map<List<Project>, List<ProjectDto>>(projects);
        }
    }
}