namespace Domain;
public class Project
{
    public Guid Id { get; set; }
    public string ProjectName { get; set; }

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public string Priority { get; set; }

    public string Owner { get; set; }

    public string Description { get; set; }
    public string ProjectGroup { get; set; }
    public bool Private { get; set; }
}
