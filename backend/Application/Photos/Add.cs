using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Photo> 
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
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

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _accessor.GetCurrentUserName());

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { error = "User not found." });


                var photoUloadResult = await _photoAccessor.AddPhoto(request.File);

                Photo photo = new()
                {
                    Url = photoUloadResult.Url,
                    Id = photoUloadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return photo;
                throw new Exception("Problem saving photo");

            }
        }
    }
}
