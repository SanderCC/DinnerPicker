using BL.Core.Extensions;
using DAL.Core.EF;
using DAL.Memory;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Tests.Infrastructure.DI;

public static class Dependencies<TA>
{
    public static T Get<T>(string dbName = nameof(TA))
    {
        return GetProvider(dbName).GetService<T>()!;
    }

    private static ServiceProvider GetProvider(string dbName)
    {
        ServiceCollection services = [];
        services
            .AddDbContext<DpContext, MemoryContext>(options => options.UseInMemoryDatabase(dbName)
            )
            .AddLogging()
            .AddScoped<ILoggerFactory, LoggerFactory>()
            .InjectAttributesAsScopedFromReferences(typeof(TA).Assembly);
        return services.BuildServiceProvider();
    }
}