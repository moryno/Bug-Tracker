using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _accessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor accessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _accessor = accessor;
                _photoAccessor = photoAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _accessor.GetCurrentUserName());

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Not found." });

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "Photo Not found." });

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentMain != null) currentMain.IsMain = false;
                photo.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem updating photo");
            }
        }
    }
}
