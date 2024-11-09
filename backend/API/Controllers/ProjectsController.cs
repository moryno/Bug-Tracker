using Application.Bugs;
using Application.Core;
using Application.Projects;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProjectsController : BaseController
    {

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PagedList<ProjectDto>>> Get ([FromQuery]ProjectParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
        }
        [HttpGet("search")]
        [Authorize]
        public async Task<ActionResult<PagedList<ProjectSearchDto>>> SearchProject ([FromQuery]ProjectParams param)
        {          
            return HandlePagedResult(await Mediator.Send(new GetSearchProjects.Query { Params = param }));
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<ProjectDto>> GetById (Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        [Authorize(Roles = "Admin, Project Manager")]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin, Project Manager")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin, Project Manager")]
        public async Task<ActionResult<Unit>> Delete(Guid id) => await Mediator.Send(new Delete.Command { Id = id });

        [HttpPost("comment")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> CreateComment(CreateProjectComment.Command command) => Ok(await Mediator.Send(command));
        [HttpGet("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<List<CommentDto>>> GetComments(Guid id)
        {
            return await Mediator.Send(new ProjectCommentList.Query { ProjectId = id });
        }
        [HttpPut("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> EdiComment(Guid id, EditProjectComment.Command command)
        {
            command.Id = id;
            return Ok(await Mediator.Send(command));
        }
        [HttpDelete("{id}/comment")]
        [Authorize]
        public async Task<ActionResult<Unit>> DeleteComment(Guid id) => Ok(await Mediator.Send(new DeleteProjectComment.Command { Id = id }));

        [HttpGet("{id}/bugs")]
        [Authorize]
        public async Task<ActionResult<List<BugDto>>> GetProjectBugs(Guid id)
        {
            return await Mediator.Send(new GetProjectbugs.Query { ProjectId = id });
        }
    }
}