using System.Text.Json.Serialization;

namespace server_dotnet.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }

    public int CategoryId { get; set; }

    [JsonIgnore]            
    public Category Category { get; set; } = null!;
}
