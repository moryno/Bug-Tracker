using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bugs
{
    public class GetAll 
    {
        public class Query : IRequest<List<BugDto>> { }
        public class Handler : IRequestHandler<Query, List<BugDto>> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<BugDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Bug> bugs = await _context.Bugs.ToListAsync();
                return _mapper.Map<List<Bug>, List<BugDto>>(bugs);
             }
        }
    }
}
