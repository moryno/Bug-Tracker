using System.Text.Json.Serialization;

namespace Domain
{
    public class Bug
    {
        public Guid Id { get; set; }
        public virtual Project Project { get; set; } = new Project();
        public string Description { get; set; } = string.Empty;
        public string BugName { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public string Classification { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public string BugStatus { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; } = string.Empty;
        public DateTime UpdatedDate { get; set; }
        public string UpdatedUser { get; set; } = string.Empty;
        public virtual ICollection<BugComment> BugComments { get; set; } = new List<BugComment>();
        public virtual ICollection<BugAssignee> BugAssignees { get; set; } = new List<BugAssignee>();
    }
}
