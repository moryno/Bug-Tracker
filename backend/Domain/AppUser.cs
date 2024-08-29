using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = string.Empty;
        public virtual ICollection<ProjectComment> ProjectComments { get; set; } = new List<ProjectComment>();
        public virtual ICollection<BugComment> BugComments { get; set; } = new List<BugComment>();
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
