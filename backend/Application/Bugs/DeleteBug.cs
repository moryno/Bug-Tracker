using Application.Errors;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class DeleteBug
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
                Bug bug = await _context.Bugs.FindAsync(request.Id);
                if (bug == null)
                    throw new RestException(HttpStatusCode.NotFound, new { bug = "Not found." });

                _context.Bugs.Remove(bug);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving project");
            }
        }
    }
}
