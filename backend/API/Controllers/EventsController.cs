using Application.Core;
using Application.Events;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class EventsController : BaseController
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> ScheduleEvent(ScheduleEvent.Command command)
        {
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id) => await Mediator.Send(new DeleteEvent.Command { Id = id });
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> EditEvent(Guid id, EditEvent.Command command)
        {
            command.Id = id;
            return Ok(await Mediator.Send(command));
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PagedList<EventDto>>> GetEvents([FromQuery] EventParams param)
        {
            return HandlePagedResult(await Mediator.Send(new GetAllEvents.Query { Params = param }));
        }  
        [HttpGet("search")]
        [Authorize]
        public async Task<ActionResult<PagedList<EventSearchDto>>> GetSearchEvent([FromQuery] EventParams param)
        {
            return HandlePagedResult(await Mediator.Send(new GetSearchEvent.Query { Params = param }));
        }
        [HttpGet("{userName}/calendar")]
        [Authorize]
        public async Task<ActionResult<List<CalendarEventDto>>> GetCalendarEvents(string userName)
        {
            return Ok(await Mediator.Send(new GetCalendarEvent.Query { UserName = userName }));
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<EventDetailDto>> GetEventDetails(Guid id)
        {
            return Ok(await Mediator.Send(new GetEventDetail.Query { Id = id }));
        }
        [HttpPost("comment")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> CreateEventComment(CreateEventComment.Command command) => Ok(await Mediator.Send(command));
        [HttpGet("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<List<CommentDto>>> GetComments(Guid id)
        {
            return await Mediator.Send(new EventCommentList.Query { EventId = id });
        }
        [HttpDelete("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<Unit>> DeleteComment(Guid id) => Ok(await Mediator.Send(new DeleteEventComment.Command { Id = id }));
    }
}
