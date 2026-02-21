using Tests.Infrastructure.DI;

namespace BL.OpenAi.Scraper.Tests;

public class RecipeScraperTests
{
    [Fact]
    public async Task FindsRecipe()
    {
        var sut = Dependencies<RecipeScraperTests>.Get<RecipeScraper>();
        var recipe = await sut.ScrapeUrlAsync("https://www.allrecipes.com/recipe/16311/simple-beef-stroganoff/");

        Assert.NotNull(recipe);
        Assert.NotEmpty(recipe.Ingredients);
        Assert.NotEmpty(recipe.Instructions);
        Assert.All(recipe.Ingredients, i => Assert.NotEmpty(i.Name));

        // Check if some instructions have ingredients mapped
        Assert.Contains(recipe.Instructions, i => i.Ingredient != null);

        Assert.NotEmpty(recipe.ImageUrl);
        Assert.NotEqual("https://example.com/image.jpg", recipe.ImageUrl);
    }
}