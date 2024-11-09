namespace Domain
{
    public class Event : IEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;   
        public string? Location { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string InitialComment { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; } = string.Empty;
        public DateTime UpdatedDate { get; set; }
        public string UpdatedUser { get; set; } = string.Empty;
        public Guid CompanyId { get; set; }
        public virtual Company? Company { get; set; }
        public virtual Project? Project { get; set; }
        public virtual ICollection<EventAttendee>? Attendees { get; set; }
        public virtual ICollection<EventComment>? Comments { get; set; }
        public virtual ICollection<Notification>? Notifications { get; set; }
    }
}
