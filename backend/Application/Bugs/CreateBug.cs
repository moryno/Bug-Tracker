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
            public ICollection<BugAssignee>? BugAssignees { get; set; } = new List<BugAssignee>();
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
                Project project = await _context.Projects.FindAsync(request.ProjectId);
                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { project = "Not found." });

                Bug existingBug = await _context.Bugs.SingleOrDefaultAsync(x => x.BugName == request.BugName);
                if(existingBug != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Bug with the same bug name exists." });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

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
                };

                _context.Bugs.Add(bug);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving bug");
            }
        }
    }
}
