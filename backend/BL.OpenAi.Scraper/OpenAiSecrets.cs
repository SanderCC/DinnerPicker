using BL.Core.Attributes;

namespace BL.OpenAi.Scraper;

[Helper]
public sealed class OpenAiSecrets
{
    public string ApiKey => Environment.GetEnvironmentVariable("openai_api_key")
                            ?? throw new InvalidOperationException(
                                "OpenAI API key not found in environment variables.");
}