using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Runnables.API.Controllers;

[ApiController, AllowAnonymous, Route("/")]
public class SystemController
{
    [HttpGet] public ActionResult<string> Health() => "Running";
}