import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItem: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        createCartItem: (state, action) => {
            state.cartItem = action.payload.cartItem;
        },
        updateCartItem: (state, action) => {

        },
        deleteCartItem: (state) => {
            state.cartItem = null;
        },
    },
});

export const { createCart, updateCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;