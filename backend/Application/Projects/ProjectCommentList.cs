using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Projects
{
    public class ProjectCommentList
    {
        public class Query : IRequest<List<CommentDto>>
        {
            public Guid ProjectId { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<CommentDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var comments = await _context.ProjectComments
                    .Where(x => x.Project.Id == request.ProjectId)
                    .OrderBy(x => x.CreatedAt)
                    .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return comments;
            }
        }
    }
}
