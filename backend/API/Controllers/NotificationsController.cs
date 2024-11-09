using Application.Notifications;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class NotificationsController : BaseController
    {
        [HttpPost("sendEmail")]
        [Authorize]
        public async Task<ActionResult<List<NotificationDto>>> SendEmail(SendEmailService.Command command)
        {
            return Ok(await Mediator.Send(command));
        } 
        [HttpPost("markAsRead")]
        [Authorize]
        public async Task<ActionResult<List<NotificationDto>>> MarkAsRead(UpdateNotification.Command command)
        {
            return Ok(await Mediator.Send(command));
        } 
        [HttpPost("markAllAsRead")]
        [Authorize]
        public async Task<ActionResult<List<NotificationDto>>> MarkAllAsRead(MarkAllAsRead.Command command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpGet("{userName}")]
        [Authorize]
        public async Task<ActionResult<List<NotificationDto>>> GetUserNotifications(string userName)
        {
            return Ok(await Mediator.Send(new GetNotification.Query { UserName = userName }));
        }
    }
}
