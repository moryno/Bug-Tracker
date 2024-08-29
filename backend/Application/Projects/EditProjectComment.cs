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
    public class EditProjectComment
    {
        public class Command : IRequest<CommentDto>
        {
            public Guid Id { get; set; }
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
                ProjectComment comment = await _context.ProjectComments.FindAsync(request.Id);
                if (comment == null)
                    throw new RestException(HttpStatusCode.NotFound, new { comment = "Not found." });
                Project project = await _context.Projects.FindAsync(request.ProjectId);
                if (project == null)
                    throw new RestException(HttpStatusCode.NotFound, new { project = "Not found." });
                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                comment.Project = project;
                comment.Author = user;
                comment.Description = request.Description ?? comment.Description;
                comment.CreatedAt = comment.CreatedAt;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return _mapper.Map<CommentDto>(comment);
                throw new Exception("Problem saving comment");
            }
        }
    }
}
