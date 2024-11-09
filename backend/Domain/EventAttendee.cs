namespace Domain
{
    public class EventAttendee
    {
        public Guid Id { get; set; }
        public Guid? EventId { get; set; }
        public virtual Event? Event { get; set; }
        public Guid? AppUserId { get; set; }
        public virtual AppUser? AppUser { get; set; }
    }
}
