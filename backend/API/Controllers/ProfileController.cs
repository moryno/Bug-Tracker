using Application.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProfileController : BaseController
    {
        [HttpGet("{userName}")]
        [Authorize]
        public async Task<ActionResult<ProfileDto>> Get(string userName)
        {
            return Ok(await Mediator.Send(new GetProfile.Query { UserName = userName }));
        }
    }
}
