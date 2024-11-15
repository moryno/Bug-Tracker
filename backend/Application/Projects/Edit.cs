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
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string ProjectName { get; set; } = string.Empty;

            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedUser { get; set; } = string.Empty;
            public DateTime UpdatedDate { get; set; }
            public string? UpdatedUser { get; set; } = string.Empty;
            public string? Priority { get; set; } = string.Empty;
            public string? Owner { get; set; } = string.Empty;
            public string CurrentStatus { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public string ProjectGroup { get; set; } = string.Empty;
            public bool Private { get; set; }
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
                var project = await _context.Projects.FindAsync(request.Id);
                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not found." });
                var user = await _context.Users.SingleOrDefaultAsync(x =>
                            request.Owner != null ? x.UserName == request.Owner : x.UserName == _userAccessor.GetCurrentUserName());

                project.ProjectName = request.ProjectName ?? project.ProjectName;
                project.ProjectGroup = request.ProjectGroup ?? project.ProjectGroup;
                project.StartDate = request.StartDate ?? project.StartDate;
                project.EndDate = request.EndDate ?? project.EndDate;
                project.Description = request.Description ?? project.Description;
                project.CurrentStatus = request.CurrentStatus ?? project.CurrentStatus;
                project.Owner = user;
                project.Private = request.Private;
                project.Priority = request.Priority ?? project.Priority;
                project.CreatedDate = project.CreatedDate;
                project.UpdatedDate = DateTime.Now;
                project.CreatedUser = project.CreatedUser;
                project.UpdatedUser = user.DisplayName;
                project.CompanyId = project.CompanyId;
                project.ProjectStatus = project.ProjectStatus;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving project");
            }
        }
    }
}