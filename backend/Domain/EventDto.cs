namespace Domain
{
    public class EventDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Location { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string InitialComment { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; } = string.Empty;

    }
}
