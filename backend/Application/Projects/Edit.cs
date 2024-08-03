using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Projects
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string ProjectName { get; set; } = string.Empty;

            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }

            public string Priority { get; set; } = string.Empty;

            public string Owner { get; set; } = string.Empty;

            public string Description { get; set; } = string.Empty;
            public string ProjectGroup { get; set; } = string.Empty;
            public bool Private { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Project project = await _context.Projects.FindAsync(request.Id);
                if (project == null)
                    throw new Exception("Could not find project.");

                project.ProjectName = request.ProjectName ?? project.ProjectName;
                project.ProjectGroup = request.ProjectGroup ?? project.ProjectGroup;
                project.StartDate = request.StartDate ?? project.StartDate;
                project.EndDate = request.EndDate ?? project.EndDate;
                project.Description = request.Description ?? project.Description;
                project.Owner = request.Owner ?? project.Owner;
                project.Private = request.Private;
                project.Priority = request.Priority ?? project.Priority;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem saving project");
            }
        }
    }
}