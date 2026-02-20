using Domain.Core;

namespace Domain.Recipes;

public class Recipe : Entity
{
    public required string Name { get; set; }
    
    public ICollection<Instruction> Instructions { get; set; } = new List<Instruction>();
}