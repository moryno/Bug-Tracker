using Application.Errors;
using Application.Interfaces;
using Application.Notifications;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class ScheduleEvent
    {
        public class Command : IRequest<List<NotificationDto>>
        {
            public string Title { get; set; } = string.Empty;
            public string? Location { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public string? InitialComment { get; set; } = string.Empty;
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

        public class IHandler : IRequestHandler<Command, List<NotificationDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly EventEmailService _eventEmailService;
            private readonly IMapper _mapper;
            private readonly IMediator _mediator;

            public IHandler(DataContext context, IUserAccessor userAccessor, EventEmailService eventEmailService, IMediator mediator, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _eventEmailService = eventEmailService;
                _mapper = mapper;
                _mediator = mediator;
            }

            public async Task<List<NotificationDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                         .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                if (user is null) throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                var project = await _context.Projects
                    .FirstOrDefaultAsync(p => p.Id == request.ProjectId);

                if (project is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Project not found" });

                Event newEvent = new()
                {
                    Title = request.Title,
                    Location = request.Location,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate,
                    InitialComment = request.InitialComment ?? "No Comment",
                    CreatedDate = DateTime.Now,
                    CreatedUser = user.DisplayName,
                    UpdatedDate = DateTime.Now,
                    UpdatedUser = user.DisplayName,
                    CompanyId = user.CompanyId,
                    Project = project
                };

                //Add Attendees
                var attendees = new List<AppUser>();
                foreach (var attendeeId in request.AttendeeIds)
                {
                    var attendee = await _context.Users.FirstOrDefaultAsync(u => u.UserName == attendeeId);

                    if (attendee != null)
                    {
                        EventAttendee eventAttendee = new ()
                        {
                            Event = newEvent,
                            AppUser = attendee
                        };
                        _context.EventAttendees.Add(eventAttendee);
                        attendees.Add(attendee);
                    }
                }

                if(request.InitialComment != null)
                {
                    EventComment comment = new()
                    {
                        Author = user,
                        Description = request.InitialComment,
                        CreatedAt = DateTime.Now,
                        Event = newEvent,
                    };

                    _context.EventComments.Add(comment);
                }

                _context.Events.Add(newEvent);

                var success = await _context.SaveChangesAsync() > 0;

                if (!success) throw new Exception("Problem saving changes");

                await _eventEmailService.SendEventInvitationsAsync(newEvent, project, attendees, user.DisplayName);

                var notifications  = await _mediator.Send(new CreateNotification.Command { NewEvent = newEvent, Attendees = attendees, Organizer = user });

                return _mapper.Map<List<NotificationDto>>(notifications);
            }
        }

    }
}
