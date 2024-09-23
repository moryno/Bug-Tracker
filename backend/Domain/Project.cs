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
    public virtual AppUser Owner { get; set; } = new AppUser();
    public string Description { get; set; } = string.Empty;
    public string ProjectGroup { get; set; } = string.Empty;
    public bool Private { get; set; }
    public Guid CompanyId { get; set; }
    public virtual Company Company { get; set; }
    public virtual ICollection<Bug> Bugs { get; set; }  = new List<Bug>();
    public virtual ICollection<ProjectComment> ProjectComments { get; set; } = new List<ProjectComment>();

}
