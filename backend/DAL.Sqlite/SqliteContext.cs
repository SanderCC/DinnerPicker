using DAL.Core.EF;
using Microsoft.EntityFrameworkCore;

namespace DAL.Sqlite;

public sealed class SqliteContext : DpContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);

        optionsBuilder.UseSqlite("Data Source=../dinnerpicker.db");
    }
}
