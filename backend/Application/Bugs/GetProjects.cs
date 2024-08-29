using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Bugs
{
    public class GetProjects
    {
        public class Query : IRequest<List<BugProjectDto>> { }
        public class Handler : IRequestHandler<Query, List<BugProjectDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<List<BugProjectDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<BugProjectDto> projects = await _context.Projects
                    .Where(x => x.Owner.UserName == _userAccessor.GetCurrentUserName())
                    .Select(project => new BugProjectDto
                    {
                        Id = project.Id,
                        ProjectName =  project.ProjectName
                    })
                    
                    .ToListAsync(cancellationToken).ConfigureAwait(false);

                return projects;
       
            }
        }
    }
}
