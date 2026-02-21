using System.Text.Json;
using BL.Core.Attributes;
using Domain.Recipes;
using HtmlAgilityPack;
using OpenAI.Chat;

namespace BL.OpenAi.Scraper;

[Service]
public sealed class RecipeScraper(OpenAiSecrets secrets)
{
    private readonly ChatClient _chatClient = new("gpt-4o-mini", secrets.ApiKey);
    private readonly HttpClient _httpClient = new();

    public async Task<Recipe?> ScrapeUrlAsync(string url)
    {
        var html = await FetchHtmlAsync(url);
        if (string.IsNullOrWhiteSpace(html)) return null;

        var cleanText = ExtractRelevantText(html);

        var isRecipe = await IsRecipePageAsync(cleanText);
        if (!isRecipe) return null;

        return await ExtractRecipeAsync(cleanText, url);
    }

    private async Task<string> FetchHtmlAsync(string url)
    {
        try
        {
            return await _httpClient.GetStringAsync(url);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching URL {url}: {ex.Message}");
            return string.Empty;
        }
    }

    private string ExtractRelevantText(string html)
    {
        var doc = new HtmlDocument();
        doc.LoadHtml(html);

        // Find potential recipe images before removing nodes
        var imageUrl = doc.DocumentNode.SelectSingleNode("//meta[@property='og:image']")
                           ?.GetAttributeValue("content", "")
                       ?? doc.DocumentNode.SelectSingleNode("//meta[@name='twitter:image']")
                           ?.GetAttributeValue("content", "");

        // Remove scripts, styles, nav, footer to reduce tokens
        var nodesToRemove = doc.DocumentNode.SelectNodes("//script|//style|//nav|//footer|//header");
        if (nodesToRemove.Count == 0)
            return doc.DocumentNode.InnerText;

        foreach (var node in nodesToRemove)
            node.Remove();

        var result = doc.DocumentNode.InnerText;
        if (!string.IsNullOrEmpty(imageUrl))
        {
            result = $"Image URL: {imageUrl}\n" + result;
        }

        return result;
    }

    private async Task<bool> IsRecipePageAsync(string text)
    {
        var prompt =
            "Analyze the following text from a webpage and determine if it contains a cooking recipe. Respond with 'Yes' or 'No' only.\n\nText:\n" +
            (text.Length > 2000 ? text[..2000] : text);

        ChatCompletion completion = await _chatClient.CompleteChatAsync(prompt);
        return completion.Content[0].Text.Trim().Equals("Yes", StringComparison.OrdinalIgnoreCase);
    }

    private async Task<Recipe?> ExtractRecipeAsync(string text, string url)
    {
        var prompt = """
                     Only return correct data, never with examples.
                     Extract the recipe from the following text into a JSON format.
                     The JSON should match this structure:
                     {
                       "Name": "Recipe Name",
                       "ImageUrl": "the image url of the recipe",
                       "Servings": 4,
                       "CookTimeMinutes": 30,
                       "Ingredients": [
                         { "Name": "Ingredient Name", "Amount": 100, "Unit": "Gram" }
                       ],
                       "Instructions": [
                         { 
                           "Order": 1, 
                           "Description": "Step 1", 
                           "Ingredient": { "Name": "Ingredient Name", "Amount": 100, "Unit": "Gram" } 
                         }
                       ]
                     }
                     Valid Units are: Gram, Milliliter, Piece. If you can't map a unit, use Piece and adjust amount.
                     The Ingredients list at the root should contain all ingredients required for the recipe.
                     The Ingredient within an Instruction should be the specific ingredient used in that step, if applicable.
                     Text:

                     """ + (text.Length > 4000 ? text[..4000] : text);

        ChatCompletion completion = await _chatClient.CompleteChatAsync(prompt);
        var jsonResponse = completion.Content[0].Text;

        // Handle potential markdown formatting in response
        if (jsonResponse.Contains("```json"))
        {
            jsonResponse = jsonResponse.Split("```json")[1].Split("```")[0].Trim();
        }
        else if (jsonResponse.Contains("```"))
        {
            jsonResponse = jsonResponse.Split("```")[1].Split("```")[0].Trim();
        }

        try
        {
            var extracted = JsonSerializer.Deserialize<ExtractedRecipe>(jsonResponse, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            if (extracted == null) return null;

            var recipe = new Recipe
            {
                Name = extracted.Name,
                Reference = url,
                ImageUrl = extracted.ImageUrl,
                Servings = extracted.Servings,
                CookTimeMinutes = extracted.CookTimeMinutes,
                Ingredients = extracted.Ingredients.Select(MapIngredient).ToList()
            };

            recipe.Instructions = extracted.Instructions.Select(i => new Instruction
            {
                Order = i.Order,
                Description = i.Description,
                Recipe = recipe,
                Ingredient = i.Ingredient != null ? MapIngredient(i.Ingredient) : null
            }).ToList();

            return recipe;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error parsing JSON: {ex.Message}");
            return null;
        }
    }

    private static Ingredient MapIngredient(ExtractedIngredient i)
    {
        return new Ingredient
        {
            Name = i.Name,
            Amount = i.Amount,
            Unit = Enum.TryParse<Unit>(i.Unit, true, out var unit) ? unit : Unit.Piece
        };
    }

    private class ExtractedRecipe
    {
        public string Name { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public int Servings { get; set; }
        public int CookTimeMinutes { get; set; }
        public List<ExtractedIngredient> Ingredients { get; set; } = [];
        public List<ExtractedInstruction> Instructions { get; set; } = [];
    }

    private class ExtractedIngredient
    {
        public string Name { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Unit { get; set; } = string.Empty;
    }

    private class ExtractedInstruction
    {
        public int Order { get; set; }
        public string Description { get; set; } = string.Empty;
        public ExtractedIngredient? Ingredient { get; set; } = null;
    }
}