using Domain.Identity;
using Domain.Recipes;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Core.EF;

public abstract class DpContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    public DbSet<Recipe> Recipes { get; set; } = null!;
    public DbSet<Instruction> Instructions { get; set; } = null!;
    public DbSet<Ingredient> Ingredients { get; set; } = null!;
}