using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest
        {
            public string ProjectName { get; set; } = string.Empty;

            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedUser { get; set; } = string.Empty;
            public DateTime UpdatedDate { get; set; }
            public string UpdatedUser { get; set; } = string.Empty;

            public string Priority { get; set; } = string.Empty;

            public string? Owner { get; set; } = string.Empty;

            public string Description { get; set; } = string.Empty;
            public string ProjectGroup { get; set; } = string.Empty;
            public bool Private { get; set; } = false;
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() 
            {
                RuleFor(x => x.ProjectName).NotEmpty().MinimumLength(3);
                RuleFor(x => x.StartDate).NotEmpty();
                RuleFor(x => x.Priority).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user =  await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                Project project = new()
                {
                    ProjectName = request.ProjectName,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    Priority = request.Priority,
                    Owner = request.Owner ?? user.UserName,
                    Description = request.Description,
                    ProjectGroup = request.ProjectGroup,
                    Private = request.Private,
                    CreatedDate = DateTime.Now,
                    CreatedUser = user.UserName,
                    UpdatedDate = DateTime.Now,
                    UpdatedUser = user.UserName,
                };

                _context.Projects.Add(project);

                UserProject userProjects = new()
                {
                    AppUser = user,
                    Project = project,
                    IsOwner = true,
                    DateAssigned = DateTime.Now,
                };

                _context.UserProjects.Add(userProjects);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving project");
            }
        }
    }
}
