namespace Domain
{
    public class DashboardCountDto
    {
        public Dictionary<string, List<Dictionary<string, int>>> DashboardCount { get; set; } = new Dictionary<string, List<Dictionary<string, int>>>();
        public List<WeeklyBugDto> WeeklyBugDtos { get; set; } = new List<WeeklyBugDto>();
    }

    public class WeeklyBugDto
    {
        public Guid Id { get; set; }
        public string? BugName { get; set; }
        public string? Description { get; set; }
        public DateTime DueDate { get; set; }
    }
}
