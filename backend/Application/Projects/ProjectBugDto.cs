using Application.Bugs;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Application.Projects
{
    public class ProjectBugDto
    {
        public Guid Id { get; set; }
        public Guid ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string BugName { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public string Classification { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public string BugStatus { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public string CreatedUser { get; set; } = string.Empty;
        public DateTime UpdatedDate { get; set; }
        public string UpdatedUser { get; set; } = string.Empty;
    }
}
