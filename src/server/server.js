import express from 'express';
import database from './database.js';
import cors from 'cors';

import UserRoute from '../backend/user/user.route.js';
import BookRoute from '../backend/book/book.route.js';
import CartRoute from '../backend/cart/cart.route.js';
import WishlistRoute from '../backend/wishlist/wishlist.route.js';
import OrderRoute from '../backend/order/order.route.js';
import AuthenticationRoute from '../backend/authentication/authentication.route.js';
import ResetRoute from '../backend/reset/reset.route.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'http://82.180.163.74',
    'http://e-library.ffmsdev.com'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/user', UserRoute);
app.use('/api/book', BookRoute);
app.use('/api/cart', CartRoute);
app.use('/api/wishlist', WishlistRoute);
app.use('/api/order', OrderRoute);
app.use('/api/auth', AuthenticationRoute);
app.use('/api/password-reset/', ResetRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});