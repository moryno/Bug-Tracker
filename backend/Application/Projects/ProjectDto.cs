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
        public double ProjectStatus { get; set; }
        public string CurrentStatus { get; set; } = string.Empty;
        public string UpdatedUser { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ProjectGroup { get; set; } = string.Empty;
        public Guid CompanyId { get; set; }
        public bool Private { get; set; }
    }
}
 