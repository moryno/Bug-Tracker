﻿using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Users
{
    public class ProfileDto
    {
        public Domain.UserProfile? Profile { get; set; }
        public ICollection<ProfileProjectDto> Projects { get; set; } = new List<ProfileProjectDto>();
        public Dictionary<string, List<Dictionary<string, int>>>? Progress { get; set; }
    }

    public class ProfileProjectDto
    {
        public Guid Id { get; set; }
        public string Priority { get; set; } = string.Empty;
        public DateTime EndDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public string ProjectName { get; set; } = string.Empty;
        public double ProjectStatus { get; set; }
        public string CreatedUser { get; set; } = string.Empty;
    }
    public class ProfileBug
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public string BugName { get; set; } = string.Empty;
        public string Severity { get; set; } = string.Empty;
        public string Classification { get; set; } = string.Empty;
        public DateTime DueDate { get; set; }
        public string BugStatus { get; set; } = string.Empty;
        public string CreatedUser { get; set; } = string.Empty;

    }
}
