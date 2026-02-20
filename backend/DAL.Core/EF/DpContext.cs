using Domain.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Core.EF;

public abstract class DpContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
    }
}