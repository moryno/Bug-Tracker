using Application.Users;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthController : BaseController
    {
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register(Register.Command command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpPost("verifyEmail")]
        public async Task<ActionResult<Unit>> VerifyEmail([FromQuery]VerifyEmail.Command command)
        {
            return Ok(await Mediator.Send(command));
        } 
        [HttpGet("resendEmailConfirmationLink")]
        public async Task<ActionResult<string>> ResendEmailConfirmationLink([FromQuery]string email)
        {
            return Ok(await Mediator.Send(new ResendEmailConfirmationLink.Query { Email = email }));
        }
    }
}
