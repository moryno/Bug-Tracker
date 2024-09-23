namespace Domain
{
    public class Company
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public virtual ICollection<AppUser> Users { get; set; } = new List<AppUser>();
        public virtual ICollection<AppRole> Roles { get; set; } = new List<AppRole>();
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
        public virtual ICollection<Bug> Bugs { get; set; } = new List<Bug>();
    }
}
