using System.Text.Json.Serialization;

namespace Application.Projects
{
    public class ProjectDto
    {
        public Guid Id { get; set; }
        public string ProjectName { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; } = string.Empty;
        public DateTime UpdatedDate { get; set; }
        public string UpdatedUser { get; set; } = string.Empty;

        public string Priority { get; set; } = string.Empty;

        public string Owner { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        public string ProjectGroup { get; set; } = string.Empty;
        public bool Private { get; set; }
        [JsonPropertyName("Assignee")]
        public ICollection<FollowerDto> UserProjects { get; set; } = new List<FollowerDto>();
    }
}
