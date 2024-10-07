namespace Domain
{
    public class BugComment
    {
        public Guid Id { get; set; }
        public virtual AppUser Author { get; set; }
        public virtual Bug Bug { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
