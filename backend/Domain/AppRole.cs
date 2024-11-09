using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppRole : IdentityRole<Guid>
    {
        public string Description { get; set; } = string.Empty;
        public string CreatedUser { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string UpdatedUser { get; set; } = string.Empty;
        public DateTime? UpdatedDate { get; set; } 
        public Guid? CompanyId { get; set; }
        public virtual Company? Company { get; set; }
        public virtual ICollection<AppUserRole>? UserRoles { get; set; }

    }
}
