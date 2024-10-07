namespace Domain
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool Status { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime DateAdded { get; set; }
        public string Image { get; set; } = string.Empty;
        public List<string> Roles { get; set; } = new List<string>();
    }
}
