import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});



