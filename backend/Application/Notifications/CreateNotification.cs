using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Notifications
{
    public class CreateNotification
    {
        public class Command : IRequest<List<NotificationDto>>
        {
            public Event? NewEvent { get; set; } 
            public List<AppUser> Attendees { get; set; } = [];
            public AppUser? Organizer { get; set; }
        }

        public class IHandler : IRequestHandler<Command, List<NotificationDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public IHandler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<NotificationDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var newEvent = request.NewEvent;
                var attendees = request.Attendees;
                var organizer = request.Organizer;

                List<Notification> notifications = new ();

                foreach (var attendee in attendees)
                {
                    Notification notification = new()
                    {
                        Message = $"{newEvent.Title}",
                        Recipient = attendee,
                        Sender = organizer,
                        Event = newEvent,
                        CreatedAt = DateTime.Now,
                        IsRead = false,
                    };

                    notifications.Add(notification);
                    _context.Notifications.Add(notification);
                }

               var success = await _context.SaveChangesAsync() > 0;
                if (success) 
                {
                    return _mapper.Map<List<NotificationDto>>(notifications);
                }

                throw new Exception("Problem saving notifications");
            }
        }
    }
}
