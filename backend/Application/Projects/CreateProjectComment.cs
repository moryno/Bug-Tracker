using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Projects
{
    public class CreateProjectComment
    {
        public class Command : IRequest<CommentDto>
        {
            public Guid ProjectId { get; set; }
            public string Description { get; set; } = string.Empty;
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Description).NotEmpty().MinimumLength(3);
                RuleFor(x => x.ProjectId).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.ProjectId);
                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { project = "Not found." });
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                ProjectComment comment = new()
                {
                    Author = user,
                    Description = request.Description,
                    CreatedAt = DateTime.Now,
                    Project = project,
                };

                _context.ProjectComments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return _mapper.Map<CommentDto>(comment);
                throw new Exception("Problem saving comment");
            }
        }
    }
}
