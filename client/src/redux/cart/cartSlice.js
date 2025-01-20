import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    guestCart: [], // Cart for guest users
  },
  reducers: {
    // Update item quantity in cart for logged-in users
    updateUserCartItem(state, action) {
      const { id, quantity } = action.payload;
      const item = state.userCart.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    // Set cart items for guest users
    setGuestCartItems(state, action) {
      state.guestCart = action.payload;
    },
    // Add item to cart for guest users
    addItemToGuestCart(state, action) {
      const { id, name, image, price, quantity } = action.payload;
      const existingItem = state.guestCart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.guestCart.push({ id, name, image, price, quantity });
      }
    },
    // Remove item from cart for guest users
    removeItemFromGuestCart(state, action) {
      state.guestCart = state.guestCart.filter(
        (item) => item.id !== action.payload
      );
    },
    // Update item quantity in cart for guest users
    updateGuestCartItem(state, action) {
      const { id, quantity } = action.payload;
      const item = state.guestCart.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    // Clear guest cart (e.g., when a guest user logs in)
    clearGuestCart(state) {
      state.guestCart = [];
    },
  },
});

export const {
  setGuestCartItems,
  addItemToGuestCart,
  removeItemFromGuestCart,
  updateGuestCartItem,
  clearGuestCart,
} = cartSlice.actions;

export default cartSlice.reducer;
