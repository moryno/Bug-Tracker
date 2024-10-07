namespace Domain
{
    public class Company
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public virtual ICollection<AppUser> Users { get; set; }
        public virtual ICollection<AppRole> Roles { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Bug> Bugs { get; set; } 
    }
}
