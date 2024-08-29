using Application.Users;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class UserController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return Ok(await Mediator.Send(command));    
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<User>> Get()
        {
            return Ok(await Mediator.Send(new CurrentUser.Query()));
        }
        [HttpGet("GetAll")]
        [Authorize]
        public async Task<ActionResult<List<UserDto>>> GetAll()
        {
            return await Mediator.Send(new GetAll.Query());
        }
    }
}
