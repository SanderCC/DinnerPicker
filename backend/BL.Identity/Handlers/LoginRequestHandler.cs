using BL.Core.Attributes;
using BL.Identity.Helpers;
using Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace BL.Identity.Handlers;

[Handler]
public class LoginRequestHandler(SignInManager<AppUser> signInManager)
{
    public async Task<LoginResponse> Handle(LoginRequest request)
    {
        var errors = new List<string>();
        var result = await signInManager.PasswordSignInAsync(
            request.Email,
            request.Password,
            isPersistent: false,
            lockoutOnFailure: true
        );

        if (result.Succeeded)
        {
            var user = await signInManager.UserManager.FindByEmailAsync(request.Email);
            var roles = await signInManager.UserManager.GetRolesAsync(user!);
            return new LoginResponse
            {
                Token = JwtHelper.CreateToken(user!, roles.ToArray()),
                Errors = [],
            };
        }

        if (result.IsLockedOut)
            errors.Add("Account is locked.");

        if (result.IsNotAllowed)
            errors.Add("Login not allowed.");

        if (result.RequiresTwoFactor)
            errors.Add("Two-factor authentication required.");

        if (errors.Any())
            return new LoginResponse
            {
                Errors = errors.ToArray(),
                Token = string.Empty,
            };

        if (!result.Succeeded)
            errors.Add("Invalid email or password.");

        return new LoginResponse
        {
            Errors = errors.ToArray(),
            Token = string.Empty,
        };
    }

    public record LoginRequest(string Email, string Password);

    public record LoginResponse
    {
        public bool Success => Errors.Length == 0;
        public required string Token { get; init; }
        public required string[] Errors { get; init; }
    }
}