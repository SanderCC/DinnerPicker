using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BL.Core.Attributes;
using Domain.Identity;
using Microsoft.IdentityModel.Tokens;
using JwtConstants = BL.Identity.Constants.JwtConstants;

namespace BL.Identity.Helpers;

[Service]
internal sealed class JwtHelper
{
    public static string CreateToken(AppUser user, string[] roles)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email!),
            new(JwtRegisteredClaimNames.Jti, Guid.CreateVersion7().ToString()),
        };
        claims.AddRange(roles.Select(role => new Claim("role", role)));

        var key = JwtConstants.IssuerSigningKey;
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTimeOffset.Now.AddDays(31).DateTime,
            signingCredentials: creds,
            issuer: JwtConstants.Issuer
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}