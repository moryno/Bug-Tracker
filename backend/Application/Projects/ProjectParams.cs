using Application.Core;

namespace Application.Projects
{
    public class ProjectParams : PagingParams
    {
        public string ProjectName { get; set; } = string.Empty;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Priority { get; set; } = string.Empty;
        public string CurrentStatus { get; set; } = string.Empty;
        public string ProjectStatus { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public string ProjectGroup { get; set; } = string.Empty;
        public string IsActive { get; set; } = string.Empty;
    }
}
