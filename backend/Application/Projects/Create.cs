using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest
        {
            public string ProjectName { get; set; } = string.Empty;
            public DateTime StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedUser { get; set; } = string.Empty;
            public DateTime UpdatedDate { get; set; }
            public string UpdatedUser { get; set; } = string.Empty;

            public string? Priority { get; set; } = string.Empty;

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
                RuleFor(x => x.Description).NotEmpty();
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
                Project existingProject = await _context.Projects.SingleOrDefaultAsync(x => x.ProjectName ==  request.ProjectName);
                if (existingProject != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Project with the same project name exists." });
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                              request.Owner != null ? x.UserName == request.Owner : x.UserName == _userAccessor.GetCurrentUserName());


                Project project = new()
                {
                    ProjectName = request.ProjectName,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate ?? request.StartDate.AddDays(90),
                    Priority = request.Priority ?? "High",
                    Owner = user,
                    Description = request.Description,
                    ProjectGroup = request.ProjectGroup,
                    Private = request.Private,
                    CreatedDate = DateTime.Now,
                    CreatedUser = user.DisplayName,
                    UpdatedDate = DateTime.Now,
                    UpdatedUser = user.DisplayName,
                };

                _context.Projects.Add(project);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving project");
            }
        }
    }
}
