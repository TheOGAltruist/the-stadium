import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: [], // Cart for logged-in users
    guestCart: [], // Cart for guest users
  },
  reducers: {
    // Set cart items for logged-in users
    setUserCartItems(state, action) {
      state.userCart = action.payload;
    },
    // Add item to cart for logged-in users
    addItemToUserCart(state, action) {
      state.userCart.push(action.payload);
    },
    // Remove item from cart for logged-in users
    removeItemFromUserCart(state, action) {
      state.userCart = state.userCart.filter(
        (item) => item.id !== action.payload
      );
    },
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
      state.guestCart.push(action.payload);
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
    // Clear user cart (e.g., after checkout)
    clearUserCart(state) {
      state.userCart = [];
    },
  },
});

export const {
  setUserCartItems,
  addItemToUserCart,
  removeItemFromUserCart,
  updateUserCartItem,
  setGuestCartItems,
  addItemToGuestCart,
  removeItemFromGuestCart,
  updateGuestCartItem,
  clearGuestCart,
  clearUserCart,
} = cartSlice.actions;

export default cartSlice.reducer;
