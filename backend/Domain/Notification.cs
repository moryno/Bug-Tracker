namespace Domain
{
    public class Notification
    {
        public Guid Id { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; }
        public DateTime? ReadAt { get; set; }
        public Guid EventId { get; set; }
        public virtual Event? Event { get; set; }
        public Guid RecipientId { get; set; }
        public virtual AppUser? Recipient { get; set; }
        public Guid SenderId { get; set; }
        public virtual AppUser? Sender { get; set; }
    }
}
