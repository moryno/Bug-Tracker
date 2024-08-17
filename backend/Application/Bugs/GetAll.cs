using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bugs
{
    public class GetAll 
    {
        public class Query : IRequest<List<Bug>> { }
        public class Handler : IRequestHandler<Query, List<Bug>> {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Bug>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Bug> bugs = await _context.Bugs.ToListAsync();
                return bugs;
             }
        }
    }
}
