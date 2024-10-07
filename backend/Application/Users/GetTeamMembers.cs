using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Users
{
    public class GetTeamMembers
    {
        public class Query : IRequest<List<Domain.UserDto>> { }
        public class Handler : IRequestHandler<Query, List<Domain.UserDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<List<Domain.UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
                var company = await _context.Companies.FindAsync(user.CompanyId);
                if (company == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Company not found." });

                var users = await _context.Users
                  .Where(u => u.CompanyId == company.Id)
                  .Select(u => new Domain.UserDto
                  {
                      Id = u.Id,
                      UserName = u.UserName,
                      FullName = u.DisplayName,
                      Email = u.Email,
                      Image = u.Photos.FirstOrDefault(p => p.IsMain).Url ?? null,
                      Status = u.Status,
                      LastActive = u.LastActive,
                      DateAdded = u.DateAdded,
                      Roles = _context.UserRoles
                            .Where(ur => ur.UserId == u.Id)
                            .Join(_context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => r.Name)
                            .ToList()
                  })
                  .ToListAsync();

                return users;

            }
        }
    }
}
