using API.Extensions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ?? (_mediator = HttpContext.RequestServices.GetService<IMediator>());

        protected ActionResult HandlePagedResult<T>(PagedList<T> result)
        {
            if (result is null) return NotFound();

            Response.AddPaginationHeader(result.CurrentPage, result.PageSize,
                result.TotalCount, result.TotalPages);

            return Ok(result);
        }
    }
}
