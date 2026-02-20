namespace Domain.Core;

public abstract class Entity
{
    public Guid Id { get; set; } = Guid.CreateVersion7();
    public DateTimeOffset CreatedOn { get; set; } = DateTimeOffset.UtcNow;
}