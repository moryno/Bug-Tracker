namespace Domain
{
    public class BugComment
    {
        public string AppUserId { get; set; } = string.Empty;
        public virtual AppUser AppUser { get; set; } = new AppUser();
        public Guid BugId { get; set; } = Guid.Empty;
        public virtual Bug Bug { get; set; } = new Bug();
        public string Description { get; set; } = string.Empty;
        public DateTime DateCommented { get; set; }
    }
}
