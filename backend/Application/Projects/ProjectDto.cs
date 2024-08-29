using Application.Bugs;
using Domain;
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
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ProjectGroup { get; set; } = string.Empty;
        public bool Private { get; set; }
        [JsonPropertyName("comments")]
        public ICollection<CommentDto> ProjectComments { get; set; } = new List<CommentDto>();
        public ICollection<BugDto> Bugs { get; set; }   = new List<BugDto>();
    }
}
 