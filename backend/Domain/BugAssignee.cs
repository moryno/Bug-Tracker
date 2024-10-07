namespace Domain
{
    public class BugAssignee
    {
        public Guid Id { get; set; }
        public Guid? BugId { get; set; }
        public virtual Bug? Bug { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }
}
