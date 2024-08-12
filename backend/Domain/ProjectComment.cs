namespace Domain
{
    public class ProjectComment
    {
        public string AppUserId { get; set; } = string.Empty;
        public virtual AppUser AppUser { get; set; }
        public Guid ProjectId { get; set; }
        public virtual Project Project { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime DateCommented { get; set; }
    }
}
