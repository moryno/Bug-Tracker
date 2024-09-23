using Application.Users;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProfileController : BaseController
    {
        [HttpGet("{userName}")]
        [Authorize]
        public async Task<ActionResult<UserProfile>> Get(string userName)
        {
            return Ok(await Mediator.Send(new GetProfile.Query { UserName = userName }));
        }
    }
}
