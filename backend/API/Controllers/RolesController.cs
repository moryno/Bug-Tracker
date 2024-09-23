﻿using Application.Roles;
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
        public async Task<ActionResult<List<Role>>> Get()
        {
            return Ok(await Mediator.Send(new GetRoles.Query()));
        }
    }
}