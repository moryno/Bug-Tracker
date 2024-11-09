using Application.Bugs;
using MediatR;
using Persistence;
using AutoMapper;
using Application.Errors;
using Domain;
using System.Net;
using Microsoft.EntityFrameworkCore;

namespace Application.Projects
{
    public class GetProjectbugs
    {
        public class Query : IRequest<List<BugDto>>
        {
            public Guid ProjectId { get; set; }
        }

        public class IHandler : IRequestHandler<Query, List<BugDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public IHandler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<BugDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.ProjectId);
                if (project is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not project found." });

                var bugs = await _context.Bugs.Where(x => x.Project!.Id == request.ProjectId).ToListAsync();
                if (bugs is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not bugs for the project found." });

                return _mapper.Map<List<Bug>, List<BugDto>>(bugs);
            }
        }
        }
    
}
