namespace Application.Core
{
    public static class EntityEmailHtmlHelper
    {
        public static string GetEntityEmailHtmlHelper(
            string entityName,
            string entityType,
            string assigneeName,
            string redirectUrl,
            string entityStartDate,
            string entityEndDate,
            string entityCreatedDate,
            string createdBy,
            string description
        )
        {
            string response = "<div style=\"background-color:#F8F8F8;padding:30px 60px;\">";

            // Event Title and Location
            response += "<div>";
            response += $"<p>Hi {assigneeName},</p>";
            response += $"<p>You have been invited to participate in <a href='{redirectUrl}' style=\"color:#12CC1B;\">{entityName}</a></p>";
            response += "</div>";

            response += "<div style=\"background-color:#fff;padding:10px 20px 30px;\">";

            // Event reminder message
            response += "<div style=\"padding:5px 0px;border-bottom:1px #EAECF0 solid;font-size:16px;\">";
            response += $"Just a friendly reminder to let you know about the {entityType} scheduled from {entityStartDate} to {entityEndDate}";
            response += "</div>";

            // Organizer details
            response += "<div style=\"display:flex;margin:15px 0px\">";
            response += "<span style=\"width:200px;font-size:15px;\">Created by</span>";
            response += $"<span style=\"font-size:15px;font-weight:500;\">: {createdBy}</span>";
            response += "</div>";

            // Start date
            response += "<div style=\"display:flex;margin-bottom:15px\">";
            response += "<span style=\"width:200px;font-size:15px;\">Starts At</span>";
            response += $"<span style=\"font-size:15px;font-weight:500;\">: {entityStartDate}</span>";
            response += "</div>";

            // End date
            response += "<div style=\"display:flex;margin-bottom:15px\">";
            response += "<span style=\"width:200px;font-size:15px;\">Ends At</span>";
            response += $"<span style=\"font-size:15px;font-weight:500;\">: {entityEndDate}</span>";
            response += "</div>";

            // Event comments
            response += "<div style=\"padding:5px 0px 20px;border-bottom:1px #EAECF0 solid;\">";
            response += "<h3>Description(s)</h3>";
            response += $"<p>{description}</p>";
            response += $"<span style=\"color:#667085;font-weight:500;\">by {createdBy} on {entityCreatedDate}</span>";
            response += "</div>";

            response += "</div>";

            // Call to action button
            response += "<div style=\"padding:30px 0;\">";
            response += $"<a href='{redirectUrl}' style='padding:10px 20px;color:#fff;background-color:#12CC1B;'>View more details</a>";
            response += "</div>";

            response += "</div>";

            return response;
        }
    }
}
