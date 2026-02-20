using Domain.Core;

namespace Domain.Recipes;

public class Ingredient : Entity
{
    public required string Name { get; set; }
    public required decimal Amount { get; set; }
    public required Unit Unit { get; set; }
}