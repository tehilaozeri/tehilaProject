import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoriesWithProducts } from "../categories/categoriesSlice";

const initialState = {
  byCategoryId: {},
  all: [],          
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoriesWithProducts.fulfilled, (state, action) => {
      const byCategoryId = {};
      const all = [];

      const categories = action.payload.map((c) => ({
        id: c.id ?? c.Id,
        name: c.name ?? c.Name,
        products: (c.products ?? c.Products ?? []).map((p) => ({
          id: p.id ?? p.Id,
          name: p.name ?? p.Name,
          price: p.price ?? p.Price,
          categoryId: p.categoryId ?? p.CategoryId,
        })),
      }));

      categories.forEach((cat) => {
        byCategoryId[cat.id] = cat.products;
        cat.products.forEach((p) => all.push(p));
      });

      state.byCategoryId = byCategoryId;
      state.all = all;
    });
  },
});

export default productsSlice.reducer;


export const selectProductsByCategoryId = (state, categoryId) =>
  state.products.byCategoryId[categoryId] || [];

export const selectAllProducts = (state) => state.products.all;
