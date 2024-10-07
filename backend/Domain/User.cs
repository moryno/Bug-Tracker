namespace Domain
{
    public class User
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public bool Status { get; set; }
        public DateTime LastActive { get; set; }
        public Guid CompanyId { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}
