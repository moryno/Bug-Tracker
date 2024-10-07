using Application.Errors;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Application.Roles
{
    public class GetUserRoles
    {
        public class Query : IRequest<List<UserRole>>
        {
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, List<UserRole>>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly IMapper _mapper;
            public Handler(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IMapper mapper)
            {
                _userManager = userManager;
                _roleManager = roleManager;
                _mapper = mapper;
            }

            public async Task<List<UserRole>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.UserName);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = $"User '{request.UserName}' not found" });

                var userRoleNames = await _userManager.GetRolesAsync(user);
                var userRoles = await _roleManager.Roles
                   
                .Where(r => userRoleNames.Contains(r.Name))
                .ProjectTo<UserRole>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return userRoles;
            }
        }
    }
    public class UserRole
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

    }
}
