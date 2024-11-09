using Application.Core;
using Application.Roles;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RolesController : BaseController
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(CreateRole.Command command)
        {
            return Ok(await Mediator.Send(command));
        }   
        [HttpPost("assign")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Unit>> Assign(AssignRole.Command command)
        {
            return Ok(await Mediator.Send(command));
        } 
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PagedList<Role>>> Get([FromQuery] PagingParams param)
        {
            return HandlePagedResult(await Mediator.Send(new GetRoles.Query { Params = param }));
        }   
        [HttpGet("{userName}")]
        [Authorize]
        public async Task<ActionResult<List<UserRole>>> GetUserRoles(string userName)
        {
            return Ok(await Mediator.Send(new GetUserRoles.Query { UserName = userName }));
        }
    }
}
