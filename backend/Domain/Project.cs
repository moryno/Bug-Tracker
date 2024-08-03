namespace Domain;
public class Project
{
    public Guid Id { get; set; }
    public string ProjectName { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public string Priority { get; set; } = string.Empty;

    public string Owner { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public string ProjectGroup { get; set; } = string.Empty;
    public bool Private { get; set; }
}
