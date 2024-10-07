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
    public class EditBug
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public Guid ProjectId { get; set; }
            public string Description { get; set; } = string.Empty;
            public string BugName { get; set; } = string.Empty;
            public virtual ICollection<BugAssignee> BugAssignees { get; set; }
            public string Severity { get; set; } = string.Empty;
            public string Classification { get; set; } = string.Empty;
            public DateTime? DueDate { get; set; }
            public string BugStatus { get; set; } = string.Empty;

        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BugName).NotEmpty().MinimumLength(3);
                RuleFor(x => x.ProjectId).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
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
                Bug bug = await _context.Bugs.FindAsync(request.Id);
                if (bug == null)
                    throw new RestException(HttpStatusCode.NotFound, new { bug = "Not found." });
                Project project = await _context.Projects.FindAsync(request.ProjectId);
                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { project = "Not found." });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                bug.Project = project;
                bug.BugName = request.BugName ?? bug.BugName;
                bug.DueDate = request.DueDate ?? bug.DueDate;
                bug.Severity = request.Severity ?? bug.Severity;
                bug.Classification = request.Classification ?? bug.Classification;
                bug.BugStatus = request.BugStatus ?? bug.BugStatus;
                bug.BugAssignees = request.BugAssignees ?? bug.BugAssignees;
                bug.CreatedDate = bug.CreatedDate;
                bug.UpdatedDate = DateTime.Now;
                bug.CreatedUser = bug.CreatedUser;
                bug.UpdatedUser = user.DisplayName;

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

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving bug");

            }
        }
    }

   
}
