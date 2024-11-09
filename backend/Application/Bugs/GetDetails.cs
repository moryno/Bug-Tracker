using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class GetDetails
    {
        public class Query : IRequest<BugDto>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, BugDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<BugDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var bug = await _context.Bugs.FindAsync(request.Id);

                if (bug == null)
                    throw new RestException(HttpStatusCode.NotFound, new { bug = "Not found." });

                return _mapper.Map<Bug, BugDto>(bug);
            }
        }
    }
}
