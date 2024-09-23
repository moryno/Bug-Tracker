using Application.Errors;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Users
{
    public class GetProfile
    {
        public class Query : IRequest<Domain.UserProfile>
        {
            public string UserName { get; set; }
        }
        public class Handler : IRequestHandler<Query, Domain.UserProfile>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Domain.UserProfile> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .ProjectTo<Domain.UserProfile>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(x => x.UserName == request.UserName);
                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });

                return user;
            }
        }
    }
}
