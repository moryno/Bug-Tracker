namespace Domain
{
    public class ProjectComment
    {
        public Guid Id { get; set; }
        public virtual AppUser? Author { get; set; }
        public virtual Project? Project { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
