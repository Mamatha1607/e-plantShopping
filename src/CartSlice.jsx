import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // ✅ Add Item Reducer
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ✅ Remove Item Reducer
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },

    // ✅ Update Quantity Reducer
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1; // Ensure quantity never goes below 1
      }
    },
  },
});

// ✅ Export Actions
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// ✅ Export Reducer for store.js
export default CartSlice.reducer;
