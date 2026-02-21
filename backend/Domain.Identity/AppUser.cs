using Microsoft.AspNetCore.Identity;

namespace Domain.Identity;

public class AppUser : IdentityUser<Guid>
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
}