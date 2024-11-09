using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class GetAllBugStatus
    {
        public class Query : IRequest<BugGroupDto> { }
        public class Handler : IRequestHandler<Query, BugGroupDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<BugGroupDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                List<Bug> bugs = await _context.Bugs
                    .Where(x => x.CompanyId == user.CompanyId)
                    .ToListAsync();

                int totalBugs = bugs.Count;

                var bugsStatus = bugs
                .GroupBy(b => b.BugStatus)
                .ToDictionary(g => g.Key, g => (double)g.Count() / totalBugs * 100);

                var bugsPerProject = bugs
                .GroupBy(b => b.Project!.Id)
                .Select(g => new Dictionary<string, int> { { g.First().Project.ProjectName, g.Count() } })
                .ToList();

                return new BugGroupDto
                {
                    BugsPerProject = bugsPerProject,
                    BugsStatus = bugsStatus
                };
            }
        }
    }
}
