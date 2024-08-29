using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bugs
{
    public class GetProjects
    {
        public class Query : IRequest<List<BugProjectDto>> { }
        public class Handler : IRequestHandler<Query, List<BugProjectDto>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<BugProjectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<BugProjectDto> projects = await _context.Projects
                    .Select(project => new BugProjectDto
                    {
                        Id = project.Id,
                        ProjectName =  project.ProjectName
                    })
                    .ToListAsync(cancellationToken).ConfigureAwait(false);

                return projects;
       
            }
        }
    }
}
