using DAL.Core.EF;
using Microsoft.EntityFrameworkCore;

namespace DAL.SqlServerLocal;

public sealed class SqlServerLocalContext : DpContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=dp;Trusted_Connection=True;");
    }
}