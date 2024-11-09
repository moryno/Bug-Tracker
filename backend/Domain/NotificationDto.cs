namespace Domain
{
    public class NotificationDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public string EventTitle { get; set; } = string.Empty;
        public DateTime EventStartDate { get; set; }
        public Guid EventId { get; set; }
        public string RecepientName { get; set; } = string.Empty;
        public string RecepientUserName { get; set; } = string.Empty;
        public string SenderName { get; set; } = string.Empty;
        public string SenderEmail { get; set; } = string.Empty;
        public string SenderImage { get; set; } = string.Empty;
        public string SenderUserName { get; set; } = string.Empty;

    }
}
