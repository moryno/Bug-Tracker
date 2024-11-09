using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Core
{
    public class CreateEntityEmailService
    {
        private readonly IEmailSender _emailSender;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public CreateEntityEmailService(IEmailSender emailSender, IHttpContextAccessor httpContextAccessor)
        {
            _emailSender = emailSender;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task SendEntityCreationAsync(IEntity entity, IEnumerable<AppUser>? assignees, AppUser user)
        {
            string origin = _httpContextAccessor.HttpContext.Request.Headers["origin"].ToString();
            string entityUrl = entity is Project
                         ? $"{origin}/projects/{entity.Id}"
                         : $"{origin}/bugs/{entity.Id}";

            foreach (var assignee in assignees)
            {
                string entityName = entity is Project project
                                        ? project.ProjectName
                                    : ((Bug)entity).BugName;
                var entityStartDate = entity is Project proj
                                        ? proj.StartDate
                                    : ((Bug)entity).CreatedDate; 
                var entityEndDate = entity is Project pro
                                        ? pro.StartDate
                                    : ((Bug)entity).CreatedDate;
                var entityType = entity is Project 
                                    ? "project" : "bug";
                var description = entity is Project p
                                    ? p.Description : ((Bug)entity).Description;

                var mailSettings = new MailSettings
                {
                    
                    ToEmail = assignee.Email,
                    Subject = $"You're invited to {entityName}",
                    Body = EntityEmailHtmlHelper.GetEntityEmailHtmlHelper(
                    entityName,
                    entityType,
                    assignee.DisplayName,
                    entityUrl,
                    entityStartDate.ToString("MM-dd-yyyy hh:mm tt"),
                    entityEndDate.ToString("MM-dd-yyyy hh:mm tt"),
                    DateTime.UtcNow.ToString("MM-dd-yyyy hh:mm tt"),
                    user.DisplayName,
                    description
                    ),
                };

                await _emailSender.SendMailAsync(mailSettings);
            }
        }
    }
}
