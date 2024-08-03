using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Details
    {
        public class Query : IRequest<Project> 
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Project>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Project> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Id);
                return project;
            }
        }
    }
}
