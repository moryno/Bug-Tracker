using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Roles
{
    public class CreateRole
    {
        public class Command : IRequest 
        {
            public string Name { get; set; } = string.Empty;
            public string? Description { get; set; } = string.Empty;
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly RoleManager<AppRole> _roleManager;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, RoleManager<AppRole> roleManager, IUserAccessor userAccessor)
            {
                _context = context;
                _roleManager = roleManager;
                _userAccessor = userAccessor;
            }
            public class CommandValidator : AbstractValidator<Command>
            {
                public CommandValidator()
                {
                    RuleFor(x => x.Name).NotEmpty().MinimumLength(3);
                }
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
                var uniqueRoleName = $"{request.Name}_{user.CompanyId}";
                var roleExists = await _context.Roles
                      .AnyAsync(r => r.NormalizedName == uniqueRoleName.ToUpper(), cancellationToken);
                if (roleExists)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Role already exists" });

                var newRole = new AppRole
                {
                    Name = request.Name,
                    Description = request.Description,
                    NormalizedName = uniqueRoleName.ToUpper(),
                    CompanyId = user.CompanyId,
                    CreatedDate = DateTime.Now,
                    CreatedUser = user.DisplayName,
                    UpdatedDate = DateTime.Now,
                    UpdatedUser = user.DisplayName
                };

                var result = await _roleManager.CreateAsync(newRole);

                if (!result.Succeeded)
                   throw new RestException(HttpStatusCode.InternalServerError, new { error = "Failed to create role" });

                return Unit.Value;
            }
        }
    }
}
