# Client Application

Frontend client for a shopping list e-commerce application built with React and Redux Toolkit.

## Features

- **Product Catalog**: Browse products organized by categories
- **Shopping Cart**: Add, remove, and manage items with quantity controls
- **Checkout Flow**: Complete order placement with order confirmation
- **Responsive Design**: Mobile-friendly interface with adaptive layout
- **RTL Support**: Right-to-left language support

## Tech Stack

- **Frontend**: React 19, Redux Toolkit, Material-UI
- **Backend Services**:
  - **.NET Server** (`https://localhost:7117/api`) - Product catalog and categories API
  - **Express.js Server** (`http://localhost:5000`) - Order submission API (located in `server/` folder)
- **Routing**: React Router DOM
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. Install frontend dependencies:
```bash
npm install
```

### Running the Application

1. Start the .NET server for products and categories:
   - Refer to the main project README for .NET server setup
   - Server should run on `https://localhost:7117/api`

2. Start the Express.js server for order submission
   - Server runs on `http://localhost:5000`

3. Start the frontend (in a new terminal):
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Structure

```
src/
├── app/          # Redux store configuration
├── components/   # Reusable UI components
├── features/     # Redux slices (cart, products, categories, orders)
├── pages/        # Main page components
└── services/     # API service layer
public/
└── products/     # Product images (product-{id}.jpg)
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
