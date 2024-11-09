using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class EditEvent
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; } = string.Empty;
            public string? Location { get; set; }
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public string InitialComment { get; set; } = string.Empty;
            public Guid ProjectId { get; set; }
            public List<string> AttendeeIds { get; set; } = [];
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty().MinimumLength(3);
                RuleFor(x => x.StartDate).NotEmpty();
                RuleFor(x => x.ProjectId).NotEmpty();
                RuleFor(x => x.AttendeeIds).NotEmpty();
                RuleFor(x => x.EndDate).NotEmpty().GreaterThan(x => x.StartDate)
                    .WithMessage("End date must be after the start date.");

            }
        }

        public class IHandler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly EventEmailService _eventEmailService;

            public IHandler(DataContext context, IUserAccessor userAccessor, EventEmailService eventEmailService)
            {
                _context = context;
                _userAccessor = userAccessor;
                _eventEmailService = eventEmailService;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var result = await _context.Events
                  .FindAsync(request.Id);
                if (result is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not found." });

                var user = await _context.Users
                         .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user is null) throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var project = await _context.Projects
                   .FirstOrDefaultAsync(p => p.Id == request.ProjectId);
                if (project is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Project not found" });

                result.Title = request.Title ?? result.Title;
                result.Location = request.Location ?? result.Location;
                result.StartDate = request.StartDate ?? result.StartDate;
                result.EndDate = request.EndDate ?? result.EndDate;
                result.InitialComment = request.InitialComment ?? result.InitialComment;
                result.CreatedDate = result.CreatedDate;
                result.CreatedUser = result.CreatedUser;
                result.UpdatedDate = DateTime.Now;
                result.UpdatedUser = user.DisplayName;
                result.CompanyId = result.CompanyId;
                result.Project = project;

                var attendees = new List<AppUser>();
                if (request.AttendeeIds != null)
                {
                    var existingAttendees = result.Attendees.Select(a => a.AppUser.UserName).ToList();

                    foreach (var attendee in request.AttendeeIds)
                    {
                        var newAttendee = await _context.Users.FirstOrDefaultAsync(u => u.UserName == attendee);
                        if (newAttendee != null)
                        {
                            if (!existingAttendees.Contains(newAttendee.UserName))
                            {


                                result.Attendees.Add(new EventAttendee
                                {
                                    Event = result,
                                    AppUser = newAttendee
                                });

                            }
                            attendees.Add(newAttendee);
                        }
                    }
                }

                var success = await _context.SaveChangesAsync() > 0;
                if (!success) throw new Exception("Problem saving changes");
                await _eventEmailService.SendEventInvitationsAsync(result, project, attendees, user.DisplayName);

                return Unit.Value;

            
            }
        }

    }
}
