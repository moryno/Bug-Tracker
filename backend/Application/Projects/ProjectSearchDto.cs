namespace Application.Projects
{
    public class ProjectSearchDto
    {
        public Guid Id { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string CurrentStatus { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Count {  get; set; } = 0;
    }
}
