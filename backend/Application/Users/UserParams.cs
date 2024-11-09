using Application.Core;

namespace Application.Users
{
    public class UserParams : PagingParams
    {
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
