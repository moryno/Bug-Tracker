using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Roles
{
    public class AssignRole
    {
        public class Command : IRequest
        {
            public string UserName { get; set; }
            public string RoleId { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.RoleId).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly DataContext _context;
            public Handler(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, DataContext context)
            {
                _userManager = userManager;
                _roleManager = roleManager;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.UserName);
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found" });
                var role = await _roleManager.FindByIdAsync(request.RoleId);
                if (role == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Role not found" });
                var isInRole = await _userManager.IsInRoleAsync(user, role.Name);
                if (isInRole)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "User is already in this role" });

                var result = await _userManager.AddToRoleAsync(user, role.Name);
                if (!result.Succeeded)
                    throw new RestException(HttpStatusCode.InternalServerError, new { error = "Failed to assign user to role" });

                return Unit.Value;
            }
        }
    }
}
