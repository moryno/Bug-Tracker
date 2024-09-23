namespace Domain
{
    public class UserProfile
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public Guid CompanyId { get; set; }
        public ICollection<Photo> photos { get; set; }
    }
}
