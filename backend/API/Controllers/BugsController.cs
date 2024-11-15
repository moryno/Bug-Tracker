﻿using Application.Bugs;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BugsController : BaseController
    {
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(CreateBug.Command command)
        {
            return Ok(await Mediator.Send(command));
        }

        [HttpGet("GetAll")]
        [Authorize]
        public async Task<ActionResult<PagedList<BugDto>>> GetAll([FromQuery] BugParams param)
        {
            return HandlePagedResult(await Mediator.Send(new GetAll.Query { Params = param }));
        }
        [HttpGet("search")]
        [Authorize]
        public async Task<ActionResult<PagedList<BugSearchDto>>> SearchBugs([FromQuery] BugParams param)
        {
            return HandlePagedResult(await Mediator.Send(new GetSearchBugs.Query { Params = param }));
        }
        [HttpGet("status")]
        [Authorize]
        public async Task<ActionResult<PagedList<BugDto>>> GetAllBugStatus()
        {
            return Ok(await Mediator.Send(new GetAllBugStatus.Query()));
        }
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<BugDto>>> GetUserBugs()
        {
            return Ok(await Mediator.Send(new GetUserBugs.Query()));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<BugDto>> Get(Guid id)
        {
            return Ok(await Mediator.Send(new GetDetails.Query { Id = id }));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(Guid id) => Ok(await Mediator.Send(new DeleteBug.Command { Id = id }));

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Edit(Guid id, EditBug.Command command)
        {
            command.Id = id;
            return Ok(await Mediator.Send(command));
        }
        [HttpGet("projects")]
        [Authorize]
        public async Task<ActionResult<List<BugProjectDto>>> GetProjects()
        {
            return await Mediator.Send(new GetProjects.Query());
        }
        [HttpPost("comment")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> CreateComment(CreateBugComment.Command command) => Ok(await Mediator.Send(command));
        [HttpGet("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<List<CommentDto>>> GetComments(Guid id)
        {
            return await Mediator.Send(new BugCommentList.Query { BugId = id });
        }
        [HttpPut("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> EdiComment(Guid id, EditBugComment.Command command)
        {
            command.Id = id;
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<Unit>> DeleteComment(Guid id) => Ok(await Mediator.Send(new DeleteBugComment.Command { Id = id }));

        [HttpGet("{id}/assignees")]
        [Authorize]
        public async Task<ActionResult<List<UserDto>>> GetBugAssignees(Guid id)
        {
            return Ok(await Mediator.Send(new GetBugAssignees.Query { BugId = id }));
        }
    }
}
