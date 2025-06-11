import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';

const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) return undefined;
        return JSON.parse(serializedCart);
    } catch (err) {
        console.warn('Could not load cart from localStorage', err);
        return undefined;
    }
};

const preloadedState = {
    cart: loadCartFromLocalStorage(),
};

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    try {
        const state = store.getState();
        localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (err) {
        console.warn('Could not save cart to localStorage', err);
    }
});

export default store;