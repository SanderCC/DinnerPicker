using Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace DAL.Core.EF;

public abstract class DpContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    
}
