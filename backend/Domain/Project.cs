namespace Domain;
public class Project
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
    public ICollection<UserProject> UserProjects { get; set; } = new List<UserProject>();
    public ICollection<ProjectComment> ProjectComments { get; set; } = new List<ProjectComment>();

}
