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
  orderTotal: number;
} = {
  cartItems: [],
  orderTotal: 0,
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
      state.orderTotal += action.payload.totalPrice;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => {
        if (item.id !== action.payload) {
          return item;
        } else {
          state.orderTotal -= item.totalPrice;
        }
      });
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item || item.quantity === item.stock || item.quantity > item.stock)
        return;
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
      state.orderTotal += item.unitPrice;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (!item) return;
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity < 1) cartSlice.caseReducers.removeItem(state, action);
      state.orderTotal -= item.unitPrice;
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
