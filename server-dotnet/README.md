# Server .NET API

A RESTful API built with ASP.NET Core 8.0 for managing categories and products.

## Technologies

- **.NET 8.0**
- **Entity Framework Core 8.0**
- **SQL Server** (LocalDB)
- **Swagger/OpenAPI**

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- SQL Server LocalDB (included with Visual Studio) or SQL Server Express

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd server-dotnet
```

### 2. Configure the database connection

Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=ShoppingDb;Trusted_Connection=True;"
  }
}
```

### 3. Run database migrations

```bash
dotnet ef database update
```

### 4. Run the application

```bash
dotnet run
```

The API will be available at:
- **HTTP**: `http://localhost:5000`
- **HTTPS**: `https://localhost:5001`
- **Swagger UI**: `https://localhost:5001/swagger`

## API Endpoints

### Categories

- `GET /api/categories` - Get all categories with their associated products

## Database

The application uses Entity Framework Core with SQL Server. The database is automatically seeded with sample data on first run.

**Models:**
- `Category` - Product categories
- `Product` - Products with price and category association

## Project Structure

```
server-dotnet/
├── Controllers/     # API controllers
├── Data/           # DbContext and database configuration
├── Models/         # Entity models
├── Migrations/     # EF Core migrations
└── Program.cs      # Application entry point
```

## License

This project is licensed under the MIT License.

