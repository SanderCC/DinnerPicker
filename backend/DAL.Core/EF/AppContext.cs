using Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DAL.Core.EF;

public class AppContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    
}
