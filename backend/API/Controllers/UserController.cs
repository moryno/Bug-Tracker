using Application.Users;
using Domain;
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
        [HttpGet("GetAll")]
        [Authorize]
        public async Task<ActionResult<List<Application.Users.UserDto>>> GetAll()
        {
            return await Mediator.Send(new GetAll.Query());
        }       
        [HttpGet()]
        [Authorize]
        public async Task<ActionResult<List<Domain.UserDto>>> GetTeamMembers()
        {
            return await Mediator.Send(new GetTeamMembers.Query());
        }
    }
}
