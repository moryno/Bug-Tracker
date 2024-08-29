using Application.Errors;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class DeleteBugComment
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
                BugComment comment = await _context.BugComments.FindAsync(request.Id);
                if (comment == null)
                    throw new RestException(HttpStatusCode.NotFound, new { comment = "Not found." });

                _context.BugComments.Remove(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem deleting project");
            }
        }
    }
}
