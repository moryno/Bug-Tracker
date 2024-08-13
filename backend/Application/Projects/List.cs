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

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ProjectDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var projects = await _context.Projects.ToListAsync();

            return _mapper.Map<List<Project>, List<ProjectDto>>(projects);
        }
    }
}