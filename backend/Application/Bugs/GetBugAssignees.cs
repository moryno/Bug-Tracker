using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class GetBugAssignees
    {
        public class Query : IRequest<List<UserDto>> 
        {
            public Guid BugId { get; set; }
        }

        public class IHandler : IRequestHandler<Query, List<UserDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public IHandler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bug = await _context.Bugs.FindAsync(request.BugId);
                if (bug is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Bug Not found." });

                var assignees = bug.BugAssignees.Select(a => a.UserName).ToList();

                var users = await _context.Users
                    .Where(x => assignees.Contains(x.UserName))
                    .Select(x => new UserDto
                    {
                        UserName = x.UserName,
                        FullName = x.DisplayName,
                        Email = x.Email,
                        LastActive = x.LastActive,
                        Image = x.Photos.SingleOrDefault(p => p.IsMain).Url,
                        Roles = _context.UserRoles
                            .Where(ur => ur.UserId == x.Id)
                            .Join(_context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name)
                            .ToList()
                    })
                    .ToListAsync();

                return users;
            }
        }
    }
}
