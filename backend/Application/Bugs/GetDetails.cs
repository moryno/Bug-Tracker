using Application.Errors;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class GetDetails
    {
        public class Query : IRequest<Bug>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Bug>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Bug> Handle(Query request, CancellationToken cancellationToken)
            {
                Bug bug = await _context.Bugs.FindAsync(request.Id);

                if (bug == null)
                    throw new RestException(HttpStatusCode.NotFound, new { bug = "Not found." });

                return bug;
            }
        }
    }
}
