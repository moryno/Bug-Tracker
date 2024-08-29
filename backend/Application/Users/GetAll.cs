using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Users
{
    public class GetAll
    {
        public class Query : IRequest<List<UserDto>> { }
        public class Handler : IRequestHandler<Query, List<UserDto>>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager)
            {
                _context = context;
                _userManager = userManager;
            }

            public async Task<List<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<UserDto> users = await _userManager.Users
                    .Select(user => new UserDto
                    {
                        UserName = user.UserName,
                        FullName = user.DisplayName
                    })
                    .ToListAsync(cancellationToken).ConfigureAwait(false);

                return users;

            }
        }
    }
}
