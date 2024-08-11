using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Projects
{
    public class FollowerDto
    {
        public string UserName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public bool IsOwner { get; set; }
    }
}
