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
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public Guid Project { get; set; }
            public string Description { get; set; } = string.Empty;
            public string BugName { get; set; } = string.Empty;
            public string Assignee { get; set; } = string.Empty;
            public string? Severity { get; set; } = string.Empty;
            public string? Classification { get; set; } = string.Empty;
            public DateTime DueDate { get; set; }
            public string? BugStatus { get; set; } = string.Empty;
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
                //Project project = await _context.Projects.SingleOrDefaultAsync(x => x.Id == request.Project);
                Bug existingBug = await _context.Bugs.SingleOrDefaultAsync(x => x.BugName == request.BugName);
                if(existingBug != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Bug with the same bug name exists." });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                Bug bug = new()
                {
                    BugName = request.BugName,
                    Project = request.Project,
                    Description = request.Description,
                    Severity = request.Severity ?? "Major",
                    Classification = request.Classification ?? "None",
                    DueDate = request.DueDate,
                    BugStatus = request.BugStatus ?? "Open",
                    Assignee = request.Assignee,
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
