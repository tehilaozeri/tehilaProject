import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesWithProducts } from "../../services/api";

export const fetchCategoriesWithProducts = createAsyncThunk(
  "categories/fetchWithProducts",
  async () => {
    const res = await getCategoriesWithProducts();
    return res.data; 
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesWithProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategoriesWithProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.map((c) => ({
          id: c.id,
          name: c.name,
        }));
      })
      .addCase(fetchCategoriesWithProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categoriesSlice.reducer;
