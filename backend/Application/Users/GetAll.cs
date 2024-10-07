using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Users
{
    public class GetAll
    {
        public class Query : IRequest<List<UserDto>> { }
        public class Handler : IRequestHandler<Query, List<UserDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<List<UserDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });
                var company = await _context.Companies.FindAsync(user.CompanyId);
                if (company == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Company not found." });

                List<UserDto> users = await _userManager.Users
                    .Where(x => x.CompanyId == company.Id)
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
