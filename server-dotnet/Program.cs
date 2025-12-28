using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using server_dotnet.Data;
using server_dotnet.Models;



var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Categories.Any())
    {
        var categories = new List<Category>
        {
            new Category { Name = "ירקות" },
            new Category { Name = "פירות" },
            new Category { Name = "מוצרי חלב" },
            new Category { Name = "בשר" },
            new Category { Name = "משקאות" },
            new Category { Name = "קפואים" }
        };

        db.Categories.AddRange(categories);
        db.SaveChanges();

        var products = new List<Product>
        {
            new Product { Name = "מלפפון", Price = 3.9m, CategoryId = categories[0].Id },
            new Product { Name = "עגבניה", Price = 4.5m, CategoryId = categories[0].Id },
            new Product { Name = "חסה", Price = 6.2m, CategoryId = categories[0].Id },

            new Product { Name = "בננה", Price = 5.9m, CategoryId = categories[1].Id },
            new Product { Name = "תפוח", Price = 4.9m, CategoryId = categories[1].Id },
            new Product { Name = "תות", Price = 12.9m, CategoryId = categories[1].Id },

            new Product { Name = "חלב 3%", Price = 6.5m, CategoryId = categories[2].Id },
            new Product { Name = "יוגורט", Price = 4.2m, CategoryId = categories[2].Id },
            new Product { Name = "גבינה צהובה", Price = 18.9m, CategoryId = categories[2].Id },

            new Product { Name = "חזה עוף", Price = 29.9m, CategoryId = categories[3].Id },
            new Product { Name = "קבב", Price = 34.9m, CategoryId = categories[3].Id },

            new Product { Name = "מים מינרליים", Price = 5.0m, CategoryId = categories[4].Id },
            new Product { Name = "קולה", Price = 7.9m, CategoryId = categories[4].Id },

            new Product { Name = "פיצה קפואה", Price = 16.9m, CategoryId = categories[5].Id },
            new Product { Name = "צ׳יפס קפוא", Price = 11.5m, CategoryId = categories[5].Id }
        };

        db.Products.AddRange(products);
        db.SaveChanges();
    }
}


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
