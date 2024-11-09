using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Roles
{
    public class GetRoles
    {
        public class Query : IRequest<PagedList<Role>>
        { 
            public PagingParams? Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, PagedList<Role>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<PagedList<Role>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query =  _context.Roles
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
                    .AsQueryable();

                return await PagedList<Role>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize);
            }
        }
    }
}
