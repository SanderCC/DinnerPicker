using BL.Identity.Handlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Runnables.API.Controllers;

[Controller, AllowAnonymous, Route("/[controller]/[action]")]
public class IdentityController : ControllerBase
{
    [HttpPost, ProducesDefaultResponseType(typeof(LoginRequestHandler.LoginResponse))]
    public async Task<IActionResult> Login([FromServices] LoginRequestHandler handler,
        [FromBody] LoginRequestHandler.LoginRequest request)
        => Ok(await handler.Handle(request));

    [HttpPost, ProducesDefaultResponseType(typeof(IdentityResult))]
    public async Task<IActionResult> Register([FromServices] RegisterRequestHandler handler,
        [FromBody] RegisterRequestHandler.RegisterRequest request)
        => Ok(await handler.Handle(request));
}