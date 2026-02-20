using DAL.Core.EF;
using Microsoft.EntityFrameworkCore;

namespace DAL.SqlLite;

public sealed class SqlLiteContext : DpContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var path = Environment.ProcessPath + "/app.db";
        optionsBuilder.UseSqlite($"Data Source={path}");
    }
}