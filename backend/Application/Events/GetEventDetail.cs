using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Events
{
    public class GetEventDetail
    {
        public class Query : IRequest<EventDetailDto>
        {
            public Guid Id { get; set; }
        }

        public class IHandler : IRequestHandler<Query, EventDetailDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public IHandler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<EventDetailDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var result = await _context.Events
                        .Include(e => e.Attendees) 
                        .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

                if (result is null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not found." });

                return _mapper.Map<Event, EventDetailDto>(result);
            }
        }
    }
}
