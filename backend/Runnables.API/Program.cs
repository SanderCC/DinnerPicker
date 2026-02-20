using BL.Core.Extensions;
using DAL.Core.EF;
using DAL.Sqlite;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddDbContext<DpContext, SqliteContext>();
builder.Services.InjectAttributesAsScopedFromReferences(typeof(Program).Assembly);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

await app.RunAsync();
