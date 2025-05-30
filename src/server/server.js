import express from 'express'
import database from './database.js'
import cors from 'cors'

import UserRoute from '../backend/user/user.route.js'
import BookRoute from '../backend/book/book.route.js'
import CartRoute from '../backend/cart/cart.route.js'
import WishlistRoute from '../backend/wishlist/wishlist.route.js'

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/user', UserRoute)
app.use('/book', BookRoute)
app.use('/cart', CartRoute)
app.use('/wishlist', WishlistRoute)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});


