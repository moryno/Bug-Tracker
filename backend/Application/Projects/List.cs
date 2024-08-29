using Application.Interfaces;
using Application.Projects;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
            var projects = await _context.Projects
                .Where(x => x.Owner.UserName == _userAccessor.GetCurrentUserName())
                .ToListAsync();

            return _mapper.Map<List<Project>, List<ProjectDto>>(projects);
        }
    }
}