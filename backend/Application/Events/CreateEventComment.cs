using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class CreateEventComment
    {
        public class Command : IRequest<CommentDto>
        {
            public Guid EventId { get; set; }
            public string Description { get; set; } = string.Empty;
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Description).NotEmpty().MinimumLength(3);
                RuleFor(x => x.EventId).NotEmpty();
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
                var result = await _context.Events.FindAsync(request.EventId);
                if (result is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not found." });
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                EventComment comment = new()
                {
                    Author = user,
                    Description = request.Description,
                    CreatedAt = DateTime.Now,
                    Event = result
                };

                _context.EventComments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("Problem saving comment");
            }
        }
    }
}
