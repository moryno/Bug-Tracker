using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<Guid>
    {
        public string DisplayName { get; set; } = string.Empty;
        public Guid CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public virtual ICollection<AppUserRole> UserRoles { get; set; } = new List<AppUserRole>();
        public virtual ICollection<ProjectComment> ProjectComments { get; set; } = new List<ProjectComment>();
        public virtual ICollection<BugComment> BugComments { get; set; } = new List<BugComment>();
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
        public virtual ICollection<Photo> Photos { get; set; } = new List<Photo>();
    }
}
