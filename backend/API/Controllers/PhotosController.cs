using Application.Bugs;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class PhotosController : BaseController
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(string id) => Ok(await Mediator.Send(new Delete.Command { Id = id }));     
        [HttpPost("{id}/setMain")]
        [Authorize]
        public async Task<ActionResult<Unit>> SetMain(string id) => Ok(await Mediator.Send(new SetMain.Command { Id = id }));

    }
}
