namespace Domain
{
    public class Role
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string Description { get; set; } = string.Empty;
        public string CreatedUser { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string UpdatedUser { get; set; } = string.Empty;
        public DateTime? UpdatedDate { get; set; }
        public Guid? CompanyId { get; set; }

    }
}
