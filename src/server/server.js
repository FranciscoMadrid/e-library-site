import express from 'express'
import database from './database.js'
import cors from 'cors'

import UserRoute from '../backend/user/user.route.js';
import BookRoute from '../backend/book/book.route.js';
import CartRoute from '../backend/cart/cart.route.js';
import WishlistRoute from '../backend/wishlist/wishlist.route.js';
import OrderRoute from '../backend/order/order.route.js';
import AuthenticationRoute from '../backend/authentication/authentication.route.js';
import ResetRoute from '../backend/reset/reset.route.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/api/user', UserRoute)
app.use('/api/book', BookRoute)
app.use('/api/cart', CartRoute)
app.use('/api/wishlist', WishlistRoute)
app.use('/api/order', OrderRoute)
app.use('/api/auth', AuthenticationRoute)
app.use('/api/password-reset/', ResetRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


