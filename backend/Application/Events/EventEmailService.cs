using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Events
{
    public class EventEmailService
    {
        private readonly IEmailSender _emailSender;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EventEmailService(IEmailSender emailSender, IHttpContextAccessor httpContextAccessor)
        {
            _emailSender = emailSender;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task SendEventInvitationsAsync(Event newEvent, Project project, IEnumerable<AppUser> attendees, string organizerName)
        {
            string origin = _httpContextAccessor.HttpContext.Request.Headers["origin"].ToString();
            string projectUrl = $"{origin}/projects/{project.Id}";
            string eventUrl = $"{origin}/events";

            foreach (var attendee in attendees)
            {
                var mailSettings = new MailSettings
                {
                    ToEmail = attendee.Email,
                    Subject = $"You're invited to {newEvent.Title}",
                    Body = EventHtmlHelper.GetEventHtmlContent(
                        organizerName,
                        project.ProjectName,
                        projectUrl,
                        newEvent.Title,
                        newEvent.Location,
                        newEvent.StartDate.ToString("MM-dd-yyyy hh:mm tt"),
                        newEvent.EndDate.ToString("MM-dd-yyyy hh:mm tt"),
                        newEvent.InitialComment,
                        DateTime.Now.ToString("MM-dd-yyyy hh:mm tt"),
                        eventUrl
                    ),
                };

                await _emailSender.SendMailAsync(mailSettings);
            }
        }
    }
}
