using Application.Errors;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class DeleteEvent
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
                var result = await _context.Events.FindAsync(request.Id);
                if (result is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not found." });

                _context.Events.Remove(result);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem deleting event");
            }
        }
    }
}
