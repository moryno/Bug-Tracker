using Application.Core;

namespace Application.Bugs
{
    public class BugParams : PagingParams
    {
        public Guid ProjectId { get; set; }
        public string BugName { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public string Classification { get; set; } = string.Empty;
        public DateTime? DueDate { get; set; }
        public string BugStatus { get; set; } = string.Empty;
        public string Assignee { get; set; } = string.Empty;
        public bool UnAssigneed { get; set; }
    }
}
