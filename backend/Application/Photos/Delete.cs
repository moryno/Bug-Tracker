using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Photos
{
    public class Delete
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

                if(photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "You cannot delete your main photo." });

                var result = await _photoAccessor.DeletePhoto(photo.Id);
                if (result == null)
                    throw new RestException(HttpStatusCode.BadRequest, new { error = "Problem deleting photo." });

                user.Photos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;
                throw new Exception("Problem deleting photo");
            }
        }
    }
}
