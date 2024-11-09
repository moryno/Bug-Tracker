namespace Application.Events
{
    public static class EventHtmlHelper
    {
        public static string GetEventHtmlContent(
            string organizerName,
            string projectName,
            string redirectUrl,
            string eventTitle,
            string eventLocation,
            string eventStartDate,
            string eventEndDate,
            string eventComment,
            string commentDate,
            string eventUrl
        )
        {
            string response = "<div style=\"background-color:#F8F8F8;padding:30px 60px;\">";

            // Event Title and Location
            response += "<div>";
            response += $"<h2>{eventTitle}</h2>";
            response += $"<p>in <a href='{redirectUrl}' style=\"color:#12CC1B;\">{projectName}</a></p>";
            response += "</div>";

            response += "<div style=\"background-color:#fff;padding:10px 20px 30px;\">";

            // Event reminder message
            response += "<div style=\"padding:5px 0px;border-bottom:1px #EAECF0 solid;font-size:16px;\">";
            response += $"Just a friendly reminder to let you know about the event scheduled from {eventStartDate} to {eventEndDate}";
            response += "</div>";

            // Organizer details
            response += "<div style=\"display:flex;margin:15px 0px\">";
            response += "<span style=\"width:200px;font-size:15px;\">Event organizer</span>";
            response += $"<span style=\"font-size:15px;font-weight:500;\">: {organizerName}</span>";
            response += "</div>";

            // Start date
            response += "<div style=\"display:flex;margin-bottom:15px\">";
            response += "<span style=\"width:200px;font-size:15px;\">Starts At</span>";
            response += $"<span style=\"font-size:15px;font-weight:500;\">: {eventStartDate}</span>";
            response += "</div>";

            // End date
            response += "<div style=\"display:flex;margin-bottom:15px\">";
            response += "<span style=\"width:200px;font-size:15px;\">Ends At</span>";
            response += $"<span style=\"font-size:15px;font-weight:500;\">: {eventEndDate}</span>";
            response += "</div>";

            // Location
            response += "<div style=\"display:flex;margin-bottom:15px\">";
            response += "<span style=\"width:200px;font-size:15px;\">Location</span>";
            response += $"<span style=\"font-size:15px;font-weight:500;\">: {eventLocation}</span>";
            response += "</div>";

            // Event comments
            response += "<div style=\"padding:5px 0px 20px;border-bottom:1px #EAECF0 solid;\">";
            response += "<h3>Event Comment(s)</h3>";
            response += $"<p>{eventComment}</p>";
            response += $"<span style=\"color:#667085;font-weight:500;\">by {organizerName} on {commentDate}</span>";
            response += "</div>";

            response += "</div>";

            // Call to action button
            response += "<div style=\"padding:30px 0;\">";
            response += $"<a href='{eventUrl}' style='padding:10px 20px;color:#fff;background-color:#12CC1B;'>View more details</a>";
            response += "</div>";

            response += "</div>";

            return response;
        }
    }

}