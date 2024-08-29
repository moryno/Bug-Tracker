namespace Application.Projects
{
    public class FollowerDto
    {
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public bool IsOwner { get; set; }
    }
}
