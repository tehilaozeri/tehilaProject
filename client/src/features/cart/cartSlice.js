import { createSlice, nanoid } from "@reduxjs/toolkit";

function round2(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: {
      reducer(state, action) {
        const { product, qty } = action.payload;
        const existing = state.items.find((i) => i.productId === product.id);
        if (existing) {
          existing.qty += qty;
        } else {
          state.items.push({
            cartItemId: nanoid(),
            productId: product.id,
            name: product.name,
            price: product.price,
            qty,
          });
        }
      },
      prepare(product, qty) {
        const safeQty = Math.max(1, Number(qty) || 1);
        return { payload: { product, qty: safeQty } };
      },
    },
    setQty(state, action) {
      const { productId, qty } = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (!item) return;
      const safe = Math.max(1, Number(qty) || 1);
      item.qty = safe;
    },
    incQty(state, action) {
      const productId = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) item.qty += 1;
    },
    decQty(state, action) {
      const productId = action.payload;
      const item = state.items.find((i) => i.productId === productId);
      if (item) item.qty = Math.max(1, item.qty - 1);
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      state.items = state.items.filter((i) => i.productId !== productId);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  setQty,
  incQty,
  decQty,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const selectCartTotal = (state) =>
  round2(state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0));

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);

export default cartSlice.reducer;
