using Application.Dashboard;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DashboardController : BaseController
    {
        [HttpGet("count")]
        [Authorize]
        public async Task<ActionResult<DashboardCountDto>> GetCount()
        {
            return Ok(await Mediator.Send(new GetDashboardCount.Query()));
        }
        [HttpGet("grid-stats")]
        [Authorize]
        public async Task<ActionResult<DashboardGridStatsResult>> GetGrid()
        {
            return Ok(await Mediator.Send(new GetDashboardGridStats.Query()));
        }
    }
}
