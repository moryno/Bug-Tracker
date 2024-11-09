namespace Application.Notifications
{
    public static class EmailHtmlHelper
    {
        public static string GetEmailHtmlHelper(string recipientName, string message)
        {
            string response = "<div style=\"padding:30px 60px;\">";
            response += $"{message}";
            response += "</div>";

            return response;
        }
    }
}
