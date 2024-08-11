using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; } = string.Empty;
        public ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
        public ICollection<ProjectComment> ProjectComments { get; set; } = new List<ProjectComment>();
        public ICollection<BugComment> BugComments { get; set; } = new List<BugComment>();
    }
}
