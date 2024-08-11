namespace Domain
{
    public class BugComment
    {
        public string AppUserId { get; set; } = string.Empty;
        public AppUser AppUser { get; set; } = new AppUser();
        public Guid BugId { get; set; } = Guid.Empty;
        public Bug Bug { get; set; } = new Bug();
        public string Description { get; set; } = string.Empty;
        public DateTime DateCommented { get; set; }
    }
}
