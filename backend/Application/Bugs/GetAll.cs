using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Bugs
{
    public class GetAll 
    {
        public class Query : IRequest<List<BugDto>> { }
        public class Handler : IRequestHandler<Query, List<BugDto>> {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<List<BugDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                AppUser user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                List<Bug> bugs = await _context.Bugs
                    .Where(x => x.CompanyId == user.CompanyId)
                    .ToListAsync();
                return _mapper.Map<List<Bug>, List<BugDto>>(bugs);
             }
        }
    }
}
