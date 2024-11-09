using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Dashboard
{
    public class GetDashboardGridStats
    {
        public class Query : IRequest<DashboardGridStatsResult> { }
        public class Handler : IRequestHandler<Query, DashboardGridStatsResult>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<DashboardGridStatsResult> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (currentUser == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = $"User not found" });

                var companyId = currentUser.CompanyId;
                var today = DateTime.UtcNow;
                var currentYear = DateTime.UtcNow.Year;

                var topProjects = await _context.Projects
                    .Where(p => p.CompanyId == companyId)
                    .OrderByDescending(p => p.Priority) // Example criteria for top projects
                    .Take(10)
                    .Select(p => new TopProjectDto
                    {
                        Id = p.Id,
                        Priority = p.Priority,
                        EndDate = p.EndDate,
                        Description = p.Description,
                        ProjectName = p.ProjectName,
                        ProjectOwnerFullName = p.Owner.DisplayName, 
                        ProjectOwnerImage = p.Owner.Photos.FirstOrDefault(p => p.IsMain).Url ?? null, 
                        ProjectStatus = p.ProjectStatus
                    })
                    .ToListAsync();

                var users = await _context.Users
                      .Where(u => u.CompanyId == companyId)
                      .Select(u => new Domain.UserDto
                      {
                          Id = u.Id,
                          UserName = u.UserName,
                          FullName = u.DisplayName,
                          Email = u.Email,
                          Image = u.Photos.FirstOrDefault(p => p.IsMain).Url ?? null,
                          Roles = _context.UserRoles
                                .Where(ur => ur.UserId == u.Id)
                                .Join(_context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name)
                                .ToList()
                      })
                      .ToListAsync();

                var bugsSubmitted = await _context.Bugs
                   .Where(b => b.CompanyId == companyId && b.CreatedDate.Year == currentYear)
                   .GroupBy(b => b.CreatedDate.Month)
                   .Select(g => new
                   {
                       Month = g.Key,
                       SubmittedCount = g.Count()
                   })
                   .ToListAsync();

                var bugsResolved = await _context.Bugs
                    .Where(b => b.CompanyId == companyId && b.CompletedDate.Year == currentYear)
                    .GroupBy(b => b.CompletedDate.Month)
                    .Select(g => new
                    {
                        Month = g.Key,
                        ResolvedCount = g.Count()
                    })
                    .ToListAsync();
                var monthlyData = new List<Dictionary<string, int>>();

                // Get all months and fill with zeroes for missing months
                for (int i = 1; i <= 12; i++)
                {
                    var monthName = new DateTime(currentYear, i, 1).ToString("MMM");

                    monthlyData.Add(new Dictionary<string, int>
                    {
                        { "name", i },
                        { "submitted", bugsSubmitted.FirstOrDefault(b => b.Month == i)?.SubmittedCount ?? 0 },
                        { "resolved", bugsResolved.FirstOrDefault(b => b.Month == i)?.ResolvedCount ?? 0 }
                    });
                }

                return new DashboardGridStatsResult
                {
                    TopProjects = topProjects,
                    Users = users,
                    ResolvedSubmittedBugs = monthlyData
                };
            }
        }
    }
}
