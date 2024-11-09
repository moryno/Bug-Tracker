using Application.Events;
using Application.Notifications;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class NotificationHub : Hub
    {
        private readonly IMediator _mediator;

        public NotificationHub(IMediator mediator)
        {
            _mediator = mediator;
        }
        public async Task SendNotification(ScheduleEvent.Command command)
        {
            var notifications = await _mediator.Send(command);

            foreach (var notification in notifications)
            {
     
                var username = notification.RecepientUserName; 

                if (!string.IsNullOrEmpty(username))

                    await Clients.Group(username).SendAsync("ReceiveNotification", notification);

                
            }
        }
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var username = httpContext.Request.Query["username"];
            await Groups.AddToGroupAsync(Context.ConnectionId, username);
            var result = await _mediator.Send(new GetNotification.Query { UserName = username });
            await Clients.Caller.SendAsync("LoadNotifications", result);
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var httpContext = Context.GetHttpContext();
            var username = httpContext.Request.Query["username"];
            if (!string.IsNullOrEmpty(username))
            {
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, username);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
