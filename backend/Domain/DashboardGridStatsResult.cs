namespace Domain
{
    public class DashboardGridStatsResult
    {
        public List<TopProjectDto>? TopProjects { get; set; }
        public List<UserDto> Users { get; set; } = new List<UserDto>();
        public List<Dictionary<string, int>>? ResolvedSubmittedBugs { get; set; }

    }

    public class TopProjectDto
    {
        public Guid Id { get; set; }
        public string? Priority { get; set; }
        public DateTime EndDate { get; set; }
        public string? Description { get; set; }
        public string? ProjectName { get; set; }
        public double ProjectStatus { get; set; }
        public string? ProjectOwnerFullName { get; set; }
        public string? ProjectOwnerImage { get; set; }
    }

}
