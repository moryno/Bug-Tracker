using Application.Core;
using Application.Projects;
using Application.Users;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class UserController : BaseController
    {
     
        [HttpGet("currentUser")]
        [Authorize]
        public async Task<ActionResult<User>> Get()
        {
            return Ok(await Mediator.Send(new CurrentUser.Query()));
        }
        [HttpPost("invite")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<string>> SendInvite(SendInvite.Command command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpGet("GetAll")]
        [Authorize]
        public async Task<ActionResult<List<Application.Users.UserDto>>> GetAll()
        {
            return await Mediator.Send(new GetAll.Query());
        }       
        [HttpGet()]
        [Authorize]
        public async Task<ActionResult<PagedList<Domain.UserDto>>> GetTeamMembers([FromQuery] UserParams param)
        {
            return HandlePagedResult(await Mediator.Send(new GetTeamMembers.Query { Params = param }));
        }
    }
}
