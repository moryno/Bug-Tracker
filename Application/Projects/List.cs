using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

public class List
{
    public class Query : IRequest<List<Project>> { }
    public class Handler : IRequestHandler<Query, List<Project>>
    {
        private readonly DataContext _context;
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Project>> Handle(Query request, CancellationToken cancellationToken)
        {
            var projects = await _context.Projects.ToListAsync();

            return projects;
        }
    }
}