using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

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
                if (currentUser is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var companyId = currentUser.CompanyId;
                var today = DateTime.UtcNow.Date;
                var endOfWeek = today.AddDays(5 - (int)today.DayOfWeek).AddDays(1).AddTicks(-1);

                var projects = await _context.Projects
                    .Where(p => p.CompanyId == companyId)
                    .ToListAsync();

                var bugs = await _context.Bugs
                    .Where(b => b.CompanyId == companyId)
                    .ToListAsync();

                var activeProjectsCount = projects
                    .Count(p => p.StartDate <= today && p.EndDate >= today);

                var inActiveProjectsCount = projects
                    .Count(p => p.EndDate < today || p.StartDate > today);

                var completedProjectsCount = projects
                    .Count(p => p.ProjectStatus == (double)100);

                // Perform in-memory operations on bugs
                var openBugsCount = bugs
                    .Count(b => b.BugStatus == "Open");

                var unassignedTicketsCount = bugs
                    .Count(b => !b.BugAssignees.Any());

                var bugSeverityCounts = bugs
                    .GroupBy(b => b.Severity)
                    .Select(g => new { Name = g.Key, Value = g.Count() })
                    .ToDictionary(x => x.Name, x => x.Value);

                var weeklyBugs = bugs
                    .Where(b => b.BugAssignees.Any(a => a.UserName == currentUser.UserName)
                                && b.DueDate >= today
                                && b.DueDate <= endOfWeek)
                    .Select(b => new WeeklyBugDto
                    {
                        Id = b.Id,
                        BugName = b.BugName,
                        Description = b.Description,
                        DueDate = b.DueDate
                    })
                    .ToList();

                var usersCount = await _context.Users
                    .Where(u => u.CompanyId == companyId)
                    .CountAsync();

                

                var dashboardInfo = new Dictionary<string, List<Dictionary<string, int>>>
                { 
                    ["activeProjectsCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "Active", activeProjectsCount } }
                    },    
                    ["projectStatusCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "Active", activeProjectsCount } },
                        new Dictionary<string, int> { { "Inactive", inActiveProjectsCount } }
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
                    ["bugSeverityCounts"] = bugSeverityCounts
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
