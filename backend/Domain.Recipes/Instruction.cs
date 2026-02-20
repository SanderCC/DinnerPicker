using Domain.Core;

namespace Domain.Recipes;

public sealed class Instruction : Entity
{
    public required Recipe Recipe { get; set; }
    public Ingredient? Ingredient { get; set; }
    
    public required int Order { get; set; }
    public required string Description { get; set; }
}