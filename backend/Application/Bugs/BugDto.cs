using Domain;
using System.Text.Json.Serialization;

namespace Application.Bugs
{
    public class BugDto
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string BugName { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public string Classification { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public DateTime CompletedDate { get; set; }
        public string BugStatus { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; } = string.Empty;
        public DateTime UpdatedDate { get; set; }
        public string UpdatedUser { get; set; } = string.Empty;
        [JsonPropertyName("assignees")]
        public ICollection<AssigneeDto> BugAssignees { get; set; } = new List<AssigneeDto>();
        [JsonPropertyName("comments")]
        public ICollection<CommentDto> BugComments { get; set; } = new List<CommentDto>(); 
    }
}
