using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<ProjectDto> 
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, ProjectDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProjectDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects
                    .FindAsync(request.Id);

                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { project = "Not found." });

                return _mapper.Map<Project, ProjectDto>(project);
            }
        }
    }
}
