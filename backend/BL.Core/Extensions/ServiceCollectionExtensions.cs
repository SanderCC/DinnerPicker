using System.Reflection;
using BL.Core.Attributes;
using Microsoft.Extensions.DependencyInjection;

namespace BL.Core.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection InjectAttributesAsScopedFromReferences(this IServiceCollection services, Assembly assembly)
    {
        return services
            .InjectAsScopedFromReferences<HandlerAttribute>(assembly)
            .InjectAsScopedFromReferences<HelperAttribute>(assembly)
            .InjectAsScopedFromReferences<ServiceAttribute>(assembly);
    }

    private static IServiceCollection InjectAsScopedFromReferences<T>(this IServiceCollection services, Assembly rootAssembly)
        where T : Attribute
    {
        // Load all referenced assemblies (recursively)
        var assemblies = GetReferencedAssembliesRecursive(rootAssembly)
            .Distinct()
            .ToList();

        foreach (var assembly in assemblies
                     .Where(e => e.FullName != null && !e.FullName.Contains("DAL")))
        {
            var typesWithAttribute = assembly
                .GetTypes()
                .Where(t => t.GetCustomAttribute<T>() != null && t is {IsAbstract: false, IsInterface: false});

            foreach (var type in typesWithAttribute)
            {
                if (services.All(d => d.ServiceType != type))
                {
                    services.AddScoped(type);
                }

                var interfaces = type.GetInterfaces();
                foreach (var @interface in interfaces)
                {
                    if (!services.Any(d => d.ServiceType == @interface && d.ImplementationType == type))
                    {
                        services.AddScoped(@interface, type);
                    }
                }
            }
        }

        return services;
    }

    private static IEnumerable<Assembly> GetReferencedAssembliesRecursive(Assembly root)
    {
        var visited = new HashSet<string?>();
        var stack = new Stack<Assembly>();
        stack.Push(root);

        while (stack.Count > 0)
        {
            var current = stack.Pop();
            if (!visited.Add(current.FullName))
                continue;

            yield return current;

            foreach (var reference in current.GetReferencedAssemblies())
            {
                try
                {
                    var loaded = Assembly.Load(reference);
                    stack.Push(loaded);
                }
                catch
                {
                    // Ignore assemblies that can't be loaded
                }
            }
        }
    }
}