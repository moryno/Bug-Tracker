namespace Domain
{
    public class EventComment
    {
        public Guid Id { get; set; }
        public virtual AppUser? Author { get; set; }
        public virtual Event? Event { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
