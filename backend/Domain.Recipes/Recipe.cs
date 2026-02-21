using Domain.Core;
using Domain.Identity;

namespace Domain.Recipes;

public class Recipe : Entity
{
    /// <summary>
    /// Name of the recipe
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// Url/Origin of the original recipe
    /// </summary>
    public string? Reference { get; set; }

    /// <summary>
    /// Image url of the recipe
    /// </summary>
    public required string ImageUrl { get; set; }

    /// <summary>
    /// Number of people served
    /// </summary>
    public int Servings { get; set; }

    /// <summary>
    /// Time in minutes to cook/prep
    /// </summary>
    public int CookTimeMinutes { get; set; }

    public AppUser? Creator { get; set; }

    public ICollection<Instruction> Instructions { get; set; } = new List<Instruction>();
}