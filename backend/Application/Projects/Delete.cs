using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }  
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Project project = await _context.Projects.FindAsync(request.Id);
                if (project == null)
                    throw new Exception("Could not find project");

                _context.Projects.Remove(project);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving project");
            }
        }
    }
}