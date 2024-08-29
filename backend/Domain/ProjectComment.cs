namespace Domain
{
    public class ProjectComment
    {
        public Guid Id { get; set; }
        public virtual AppUser Author { get; set; } = new AppUser();
        public virtual Project Project { get; set; } = new Project();
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
