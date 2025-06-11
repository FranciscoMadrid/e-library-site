import { createSlice } from '@reduxjs/toolkit';

const userFromStorage = localStorage.getItem('user');
const tokenFromStorage = localStorage.getItem('accessToken');

const initialState = {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    accessToken: tokenFromStorage || null,
    isAuthenticated: !!userFromStorage && !!tokenFromStorage,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;

            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;