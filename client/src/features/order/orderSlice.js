import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../../services/api";

export const submitOrder = createAsyncThunk(
  "order/submitOrder",
  async (payload) => {
    return await postOrder(payload);
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    status: "idle",
    error: null,
    lastOrderResponse: null,
  },
  reducers: {
    resetOrderState(state) {
      state.status = "idle";
      state.error = null;
      state.lastOrderResponse = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrderResponse = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Order submit failed";
      });
  },
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
