using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
    }
}
