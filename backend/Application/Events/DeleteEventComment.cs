using Application.Errors;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class DeleteEventComment
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
                var comment = await _context.EventComments.FindAsync(request.Id);
                if (comment is null)
                    throw new RestException(HttpStatusCode.NotFound, new { erro = "Not found." });

                _context.EventComments.Remove(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem deleting comment");
            }
        }
    }
}
