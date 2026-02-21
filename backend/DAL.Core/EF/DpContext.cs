using Domain.Identity;
using Domain.Picker;
using Domain.Recipes;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL.Core.EF;

public abstract class DpContext : IdentityDbContext<AppUser, AppRole, Guid>
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(DpContext).Assembly);
    }

    #region Recipes

    public DbSet<Recipe> Recipes { get; set; } = null!;
    public DbSet<Instruction> Instructions { get; set; } = null!;
    public DbSet<Ingredient> Ingredients { get; set; } = null!;

    #endregion

    #region Picker

    public DbSet<PickerSession> PickerSessions { get; set; } = null!;
    public DbSet<PickerUserSession> PickerUserSessions { get; set; } = null!;

    #endregion
}