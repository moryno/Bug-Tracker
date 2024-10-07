using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

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
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
                var company = await _context.Companies.FindAsync(user.CompanyId);
                if (company == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Company not found." });

                List<BugProjectDto> projects = await _context.Projects
                    .Where(x => x.CompanyId == company.Id)
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
