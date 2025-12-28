using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_dotnet.Data;

namespace server_dotnet.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<IActionResult> GetCategoriesWithProducts()
    {
        var categories = await _context.Categories
            .Include(c => c.Products)
            .Select(c => new
            {
                c.Id,
                c.Name,
                Products = c.Products.Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.CategoryId
                }).ToList()
            })
            .ToListAsync();

        return Ok(categories);
    }
}
