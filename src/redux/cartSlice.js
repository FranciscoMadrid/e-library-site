import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    toggleCart: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
    setCart: (state, action) => {
        state.items = action.payload;
    },
    addToCart: (state, action) => {
        const existing = state.items.find(item => item.book_variant_id === action.payload.book_variant_id);
        if (existing) {
        existing.quantity += action.payload.quantity;
        } else {
        state.items.push(action.payload);
        }
    },
    updateQuantity: (state, action) => {
        const { cart_item_id, quantity } = action.payload;
        const item = state.items.find(i => i.cart_item_id === cart_item_id);
        if (item) item.quantity = quantity;
    },
    removeFromCart: (state, action) => {
        state.items = state.items.filter(i => i.cart_item_id !== action.payload);
    },
    clearCart: (state) => {
        state.items = [];
    },
    cartToggleOpen: (state) => { state.toggleCart = true },
    cartToggleClose: (state) => { state.toggleCart = false },
    toggleCart: (state) => { state.toggleCart = !state.toggleCart },
},
});

export const {
    setCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartToggleOpen,
    cartToggleClose,
    toggleCart
} = cartSlice.actions;

export default cartSlice.reducer;