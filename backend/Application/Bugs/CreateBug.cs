using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class CreateBug
    {
        public class Command : IRequest
        {
            public Guid ProjectId { get; set; }
            public string Description { get; set; } = string.Empty;
            public string BugName { get; set; } = string.Empty;
            public ICollection<BugAssignee>? BugAssignees { get; set; }
            public string? Severity { get; set; } = string.Empty;
            public string? Classification { get; set; } = string.Empty;
            public DateTime DueDate { get; set; }
            public string? BugStatus { get; set; } = string.Empty;

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BugName).NotEmpty().MinimumLength(3);
                RuleFor(x => x.ProjectId).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Severity).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Unit>
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
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
                var company = await _context.Companies.FindAsync(user.CompanyId);
                if (company == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Company not found." });
                Project project = await _context.Projects.SingleOrDefaultAsync(x => x.Id == request.ProjectId && x.CompanyId == user.CompanyId);
                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Project Not found." });

                Bug existingBug = await _context.Bugs.SingleOrDefaultAsync(x => x.BugName == request.BugName && x.CompanyId == user.CompanyId);
                if(existingBug != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Bug with the same bug name exists." });

                Bug bug = new()
                {
                    BugName = request.BugName,
                    Project = project,
                    Description = request.Description,
                    Severity = request.Severity ?? "Major",
                    Classification = request.Classification ?? "None",
                    DueDate = request.DueDate,
                    BugStatus = request.BugStatus ?? "Open",
                    BugAssignees = request.BugAssignees,
                    CreatedDate = DateTime.Now,
                    CreatedUser = user.DisplayName,
                    UpdatedDate = DateTime.Now,
                    UpdatedUser = user.DisplayName,
                    CompanyId = company.Id
                };

                if (request.BugStatus == "Completed")
                {
                    // Recalculate the project status (percentage of completed bugs)
                    int totalBugs = project.Bugs.Count;
                    int completedBugs = project.Bugs.Count(b => b.BugStatus == "Completed");

                    // Calculate project status as percentage
                    double projectStatus = totalBugs > 0 ? (double)completedBugs / totalBugs * 100 : 0;

                    // Update project status
                    project.ProjectStatus = projectStatus;
                    project.UpdatedDate = DateTime.Now;
                    project.UpdatedUser = user.DisplayName;
                    bug.CompletedDate = DateTime.Now;
                    // Mark project as updated
                    _context.Projects.Update(project);
                }

                _context.Bugs.Add(bug);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving bug");
            }
        }
    }
}
