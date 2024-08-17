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
            public Guid Project { get; set; }
            public string Description { get; set; } = string.Empty;
            public string BugName { get; set; } = string.Empty;
            public string Assignee { get; set; } = string.Empty;
            public string Severity { get; set; } = string.Empty;
            public string Classification { get; set; } = string.Empty;
            public DateTime? DueDate { get; set; }
            public string BugStatus { get; set; } = string.Empty;
            public DateTime CreatedDate { get; set; }
            public string CreatedUser { get; set; } = string.Empty;
            public DateTime UpdatedDate { get; set; }
            public string UpdatedUser { get; set; } = string.Empty;
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.BugName).NotEmpty().MinimumLength(3);
                RuleFor(x => x.Project).NotEmpty();
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

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                bug.Project = request.Project;
                bug.BugName = request.BugName ?? bug.BugName;
                bug.DueDate = request.DueDate ?? bug.DueDate;
                bug.Severity = request.Severity ?? bug.Severity;
                bug.Classification = request.Classification ?? bug.Classification;
                bug.BugStatus = request.BugStatus ?? bug.BugStatus;
                bug.Assignee = request.Assignee ?? bug.Assignee;
                bug.CreatedDate = bug.CreatedDate;
                bug.UpdatedDate = DateTime.Now;
                bug.CreatedUser = bug.CreatedUser;
                bug.UpdatedUser = user.DisplayName;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving bug");

            }
        }
    }

   
}
