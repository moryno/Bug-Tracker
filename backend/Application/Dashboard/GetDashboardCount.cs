using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Dashboard
{
    public class GetDashboardCount
    {
        public class Query : IRequest<DashboardCountDto> { }
        public class IHandler : IRequestHandler<Query, DashboardCountDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public IHandler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<DashboardCountDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                var companyId = currentUser.CompanyId;
                var today = DateTime.UtcNow.Date;
                var endOfWeek = today.AddDays(5 - (int)today.DayOfWeek);

                var activeProjectsCount = await _context.Projects
                    .Where(p => p.CompanyId == companyId && p.StartDate <= today && p.EndDate >= today)
                    .CountAsync();

                var inActiveProjects = await _context.Projects
                    .Where(p => p.CompanyId == companyId && (p.EndDate < today || p.StartDate > today))
                    .CountAsync();

                var completedProjectsCount = await _context.Projects
                    .Where(p => p.CompanyId == companyId && p.ProjectStatus == (double)100)
                    .CountAsync();

                var openBugsCount = await _context.Bugs
                    .Where(b => b.CompanyId == companyId && b.BugStatus == "Open")
                    .CountAsync();

                var unassignedTicketsCount = await _context.Bugs
                    .Where(b => b.CompanyId == companyId && !b.BugAssignees.Any())
                    .CountAsync();

                var usersCount = await _context.Users
                    .Where(u => u.CompanyId == companyId)
                    .CountAsync();

                var bugSeverityCounts = await _context.Bugs
                    .Where(b => b.CompanyId == companyId)
                    .GroupBy(b  => b.Severity)
                    .Select(g => new { Name = g.Key, Value = g.Count() })
                    .ToListAsync();

                var severityCounts = bugSeverityCounts.ToDictionary(x => x.Name, x => x.Value);

                var weeklyBugs = await _context.Bugs
                    .Where(b => b.CompanyId == companyId && b.BugAssignees.Any(a => a.UserName == currentUser.UserName) && b.DueDate.Date >= today && b.DueDate.Date <= endOfWeek)
                       .Select(b => new WeeklyBugDto
                       {
                           Id = b.Id,
                           BugName = b.BugName,
                           Description = b.Description,
                           DueDate = b.DueDate
                       })
                    .ToListAsync();

                var dashboardInfo = new Dictionary<string, List<Dictionary<string, int>>>
                { 
                    ["activeProjectsCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "Active", activeProjectsCount } }
                    },    
                    ["projectStatusCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "Active", activeProjectsCount } },
                        new Dictionary<string, int> { { "Inactive", inActiveProjects } }
                    },
                    ["completedProjectsCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "CompletedProjects", completedProjectsCount } }
                    },
                    ["openBugsCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "OpenBugs", openBugsCount } }
                    },       
                    ["unassignedBugsCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "UnassignedBugs", unassignedTicketsCount } }
                    },   
                    ["teamCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "teamMembers", usersCount } }
                    },
                    ["bugSeverityCounts"] = severityCounts
                    .Select(sc => new Dictionary<string, int> { { sc.Key, sc.Value } })
                    .ToList(),
                    
                };

                return new DashboardCountDto
                {
                    DashboardCount = dashboardInfo,
                    WeeklyBugDtos = weeklyBugs
                };
            }
        }
    }
}
