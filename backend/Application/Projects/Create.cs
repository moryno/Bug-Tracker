using Application.Core;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Projects
{
    public class Create
    {
        public class Command : IRequest
        {
            public string ProjectName { get; set; } = string.Empty;
            public DateTime StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedUser { get; set; } = string.Empty;
            public DateTime UpdatedDate { get; set; }
            public string UpdatedUser { get; set; } = string.Empty;
            public string? Priority { get; set; } = string.Empty;
            public string? CurrentStatus { get; set; } = string.Empty;
            public string? Owner { get; set; } = string.Empty;

            public string Description { get; set; } = string.Empty;
            public string ProjectGroup { get; set; } = string.Empty;
            public bool Private { get; set; } = false;
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator() 
            {
                RuleFor(x => x.ProjectName).NotEmpty().MinimumLength(3);
                RuleFor(x => x.StartDate).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly CreateEntityEmailService _createEntityEmailService;

            public Handler(DataContext context, IUserAccessor userAccessor, CreateEntityEmailService createEntityEmailService)
            {
                _context = context;
                _userAccessor = userAccessor;
                _createEntityEmailService = createEntityEmailService;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x =>
                             request.Owner != null ? x.UserName == request.Owner : x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
        

                var existingProject = await _context.Projects
                                         .SingleOrDefaultAsync(x => x.ProjectName == request.ProjectName && x.CompanyId == user.CompanyId);

                if (existingProject != null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Project with the same project name exists." });


                Project project = new()
                {
                    ProjectName = request.ProjectName,
                    StartDate = request.StartDate,
                    EndDate = request.EndDate ?? request.StartDate.AddDays(90),
                    Priority = request.Priority ?? "High",
                    Owner = user,
                    Description = request.Description,
                    CurrentStatus = request.CurrentStatus ?? "Active",
                    ProjectGroup = request.ProjectGroup,
                    Private = request.Private,
                    CreatedDate = DateTime.Now,
                    CreatedUser = user.DisplayName,
                    UpdatedDate = DateTime.Now,
                    UpdatedUser = user.DisplayName,
                    CompanyId = user.CompanyId,
                    ProjectStatus = 0
                };

                _context.Projects.Add(project);

                var success = await _context.SaveChangesAsync() > 0;
                if (!success) throw new Exception("Problem saving project");  
                await _createEntityEmailService.SendEntityCreationAsync(project, [user], user);

                return Unit.Value;
               
            }
        }
    }
}
