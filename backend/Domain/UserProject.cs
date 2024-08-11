namespace Domain
{
    public class UserProject
    {
        public string AppUserId { get; set; } = string.Empty;
        public AppUser AppUser { get; set; } 
        public Guid ProjectId { get; set; }
        public Project Project { get; set; } 
        public DateTime DateAssigned { get; set; }
        public bool IsOwner { get; set; }
    }
}
