import { createSlice } from "@reduxjs/toolkit";

const deleteItemInCart = (cartItems, itemToDelete) => {
  return cartItems.filter(
    (cartItem) => cartItem.packageId !== itemToDelete.packageId
  );
};

const addCartItem = (cartItems, itemToAdd) => {
  return [...cartItems, itemToAdd];
};

const initialState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  clientSecret: "",
};

const cartSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newCartItems = addCartItem(state.cartItems, action.payload);
      return { ...state, cartItems: newCartItems };
    },
    deleteItemFromCart(state, action) {
      const newCartItems = deleteItemInCart(state.cartItems, action.payload);
      return { ...state, cartItems: newCartItems };
    },
    setCartCount(state, action) {
      return { ...state, cartCount: action.payload };
    },
    setCartTotal(state, action) {
      return { ...state, cartTotal: action.payload };
    },
    setClientSecret(state, action) {
      return { ...state, clientSecret: action.payload };
    },
    reset() {
      return { ...initialState };
    },
  },
});

export default cartSlice.reducer;
export const {
  addItemToCart,
  deleteItemFromCart,
  setCartCount,
  setCartTotal,
  setClientSecret,
  reset,
} = cartSlice.actions;
