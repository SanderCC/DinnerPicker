using DAL.Core.EF;
using Microsoft.EntityFrameworkCore;

namespace DAL.Memory;

public class MemoryContext(string databaseName) : DpContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase(databaseName);
    }
}