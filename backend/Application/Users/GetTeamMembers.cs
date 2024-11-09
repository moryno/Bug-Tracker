using Application.Core;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Net;

namespace Application.Users
{
    public class GetTeamMembers
    {
        public class Query : IRequest<PagedList<Domain.UserDto>> 
        {
            public UserParams? Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, PagedList<Domain.UserDto>>
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

            public async Task<PagedList<Domain.UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
          
                var query = _context.Users
                  .Where(u => u.CompanyId == user.CompanyId)
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
                .AsQueryable();

                if (!String.IsNullOrEmpty(request.Params.FullName))
                {
                    query = query.Where(x => x.FullName.ToLower().Contains(request.Params.FullName.ToLower()));
                }
                if (!String.IsNullOrEmpty(request.Params.Role))
                {
                    query = query.Where(x => x.Roles.Any(r => r.Contains(request.Params.Role)));
                }
                if (!String.IsNullOrEmpty(request.Params.Status))
                {
                    var status = request.Params.Status == "Active" ? true : false;
                    query = query.Where(x => x.Status == status);
                }

                return await PagedList<Domain.UserDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);

            }
        }
    }
}
