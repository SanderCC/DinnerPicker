using Tests.Infrastructure.Constants;
using Tests.Infrastructure.DI;

namespace BL.OpenAi.Scraper.Tests;

[Trait(TraitType.Category, TraitCategory.Smart)]
public class RecipeScraperTests
{
    [Theory]
    [InlineData("https://www.allrecipes.com/recipe/16311/simple-beef-stroganoff/")]
    [InlineData("https://www.allrecipes.com/gallery/dinners-that-start-with-alfredo-sauce/")]
    public async Task FindsRecipe(string url)
    {
        var sut = Dependencies<RecipeScraperTests>.Get<RecipeScraper>();
        var recipe = await sut.ScrapeUrlAsync(url);

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