using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net;

namespace Application.Roles
{
    public class AssignRole
    {
        public class Command : IRequest
        {
            public string UserName { get; set; }
            public ICollection<string> RoleIds { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.RoleIds).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            public Handler(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
            {
                _userManager = userManager;
                _roleManager = roleManager;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.UserName);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = $"User '{request.UserName}' not found" });


                var currentUserRoles = await _userManager.GetRolesAsync(user);
                if (currentUserRoles.Any())
                {
                    var removeResult = await _userManager.RemoveFromRolesAsync(user, currentUserRoles);
                    if (!removeResult.Succeeded)
                    {
                        throw new RestException(HttpStatusCode.InternalServerError, new { error = $"Failed to remove current roles from user '{request.UserName}'" });
                    }
                }

                // Add the new roles specified in request.RoleIds
                foreach (var roleId in request.RoleIds)
                {
                    var role = await _roleManager.FindByIdAsync(roleId);
                    if (role == null)
                    {
                        throw new RestException(HttpStatusCode.NotFound, new { error = $"Role with ID '{roleId}' not found" });
                    }

                    var addResult = await _userManager.AddToRoleAsync(user, role.Name);
                    if (!addResult.Succeeded)
                    {
                        throw new RestException(HttpStatusCode.InternalServerError, new { error = $"Failed to assign user '{request.UserName}' to role '{role.Name}'" });
                    }
                }

                return Unit.Value;

            }
        }
    }
}
