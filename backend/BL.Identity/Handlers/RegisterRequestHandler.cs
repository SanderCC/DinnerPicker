using BL.Core.Attributes;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace BL.Identity.Handlers;

[Handler]
public class RegisterRequestHandler(UserManager<AppUser> userManager)
{
    public async Task<IdentityResult> Handle(RegisterRequest request)
    {
        var user = new AppUser
        {
            UserName = request.Email,
            Email = request.Email,
            NormalizedEmail = request.Email.ToUpperInvariant(),
            NormalizedUserName = request.Email.ToUpperInvariant(),
            EmailConfirmed = true,
        };

        var result = await userManager.CreateAsync(user, request.Password);

        return result;
    }

    public record RegisterRequest(string Email, string Password);
}