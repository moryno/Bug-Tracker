namespace Domain
{
    public class BugComment
    {
        public Guid Id { get; set; }
        public virtual AppUser Author { get; set; } = new AppUser();
        public virtual Bug Bug { get; set; } = new Bug();
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
