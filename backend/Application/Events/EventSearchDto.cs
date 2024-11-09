namespace Application.Events
{
    public class EventSearchDto
    {
        public Guid Id { get; set; }
        public DateTime StartDate { get; set; }
        public string Title { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string? Location { get; set; } = string.Empty;
        public string InitialComment { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public int Count { get; set; } = 0;
    }
}
