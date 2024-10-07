using Application.Errors;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;

namespace Application.Users
{
    public class GetProfile
    {
        public class Query : IRequest<ProfileDto>
        {
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, ProfileDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ProfileDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .ProjectTo<Domain.UserProfile>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(x => x.UserName == request.UserName);
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
                var userBugs = await _context.Bugs
                  .Where(x => x.BugAssignees.Any(b => b.UserName == request.UserName))
                  .Include(b => b.Project)
                  .ToListAsync();

                var bugs = userBugs.Select(b => new ProfileBug
                {
                    Id = b.Id,
                    Description = b.Description,
                    BugName = b.BugName,
                    BugStatus = b.BugStatus,
                    Severity = b.Severity,
                    Classification = b.Classification,
                    DueDate = b.DueDate,
                    CreatedUser = b.CreatedUser,
                }).ToList();


                var projects = userBugs
                    .Select(b => b.Project)
                    .Distinct()
                    .Select(p => new ProfileProjectDto
                    {
                        Id = p.Id,
                        ProjectName = p.ProjectName,
                        Description = p.Description,
                        Priority = p.Priority,
                        EndDate = p.EndDate,
                        ProjectStatus = p.ProjectStatus,
                        CreatedUser = p.CreatedUser
                    })
                    .ToList();

                var assignedBugsCount = userBugs.Count();
                var completedBugsCount = userBugs.Count(b => b.BugStatus == "Completed");

                var progress = new Dictionary<string, List<Dictionary<string, int>>>
                {
                    ["progressCount"] = new List<Dictionary<string, int>>
                    {
                        new Dictionary<string, int> { { "Completed", completedBugsCount } },
                        new Dictionary<string, int> { { "InComplete", assignedBugsCount - completedBugsCount } }
                    }
                };

                return new ProfileDto
                {
                    Profile = user,
                    Bugs = bugs,
                    Projects = projects,
                    Progress = progress
                };
            }
        }
    }
}
