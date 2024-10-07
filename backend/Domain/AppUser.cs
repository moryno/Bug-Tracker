using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser<Guid>
    {
        public string DisplayName { get; set; } = string.Empty;
        public Guid CompanyId { get; set; }
        public bool Status { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime DateAdded { get; set; }
        public virtual Company Company { get; set; }
        public virtual ICollection<AppUserRole> UserRoles { get; set; }
        public virtual ICollection<ProjectComment> ProjectComments { get; set; }
        public virtual ICollection<BugComment> BugComments { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
    }
}
