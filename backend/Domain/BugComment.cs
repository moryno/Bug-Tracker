namespace Domain
{
    public class BugComment
    {
        public string AppUserId { get; set; } = string.Empty;
        public AppUser AppUser { get; set; }
        public Guid BugId { get; set; }
        public Bug Bug { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime DateCommented { get; set; }
    }
}
