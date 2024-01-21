import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  cartItems: {
    id: string;
    quantity: number;
    stock: number;
    title: string;
    picture: string;
    unitPrice: number;
    totalPrice: number;
  }[];
} = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: () => {
      return initialState;
    },
    addItem: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        stock: number;
        unitPrice: number;
        totalPrice: number;
        picture: string;
        title: string;
      }>
    ) => {
      state.cartItems.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item || item.quantity === item.stock || item.quantity > item.stock)
        return;
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity < 1) cartSlice.caseReducers.removeItem(state, action);
    },
  },
});

export const {
  clearCart,
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
