using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace BL.Identity.Constants;

public static class JwtConstants
{
    public const string Issuer = "DinnerPicker";
    public static SymmetricSecurityKey IssuerSigningKey => new(Encoding.UTF8.GetBytes(Secret));
    private static string Secret => Environment.GetEnvironmentVariable("jwt_secret") ?? "ae626a7e-5516-4868-9133-546b810aa8f4";
}