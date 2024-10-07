using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Roles
{
    public class GetRoles
    {
        public class Query : IRequest<List<Role>> { }
        public class Handler : IRequestHandler<Query, List<Role>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Role>> Handle(Query request, CancellationToken cancellationToken)
            {
                List<Role> roles = await _context.Roles
                                        .Select(role => new Role
                                        {
                                            Name = role.Name,
                                            Description = role.Description,
                                            Id = role.Id,
                                            CompanyId = role.CompanyId,
                                            CreatedUser = role.CreatedUser,
                                            UpdatedUser = role.UpdatedUser,
                                            UpdatedDate = role.UpdatedDate,
                                        })
                    .ToListAsync(cancellationToken).ConfigureAwait(false);

                return roles;
            }
        }
    }
}
