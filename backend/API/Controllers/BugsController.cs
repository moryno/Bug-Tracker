using Application.Bugs;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BugsController : BaseController
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Bug>>> GetAll()
        {
            return Ok(await Mediator.Send(new GetAll.Query()));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Bug>> Get(Guid id)
        {
            return Ok(await Mediator.Send(new GetDetails.Query { Id = id }));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(Guid id) => Ok(await Mediator.Send(new DeleteBug.Command { Id = id }));

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Edit(Guid id, EditBug.Command command)
        {
            command.Id = id;
            return Ok(await Mediator.Send(command));
        }

    }
}
