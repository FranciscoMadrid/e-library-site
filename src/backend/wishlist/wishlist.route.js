import express from 'express'
import * as WishlistControl from './wishlist.controller.js'

const router = express.Router();

// Wishlist Item-----------------------------------------
router.get('/item', WishlistControl.getAllWishlistItem);
router.get('/item/:id', WishlistControl.getByIdWishlistItem);
router.post('/item/', WishlistControl.createWishlistItem);
router.put('/item/:id', WishlistControl.updateWishlistItem);
router.delete('/item/:id', WishlistControl.deleteByIdWishlistItem);

// Main Wishlist-----------------------------------------
router.get('/', WishlistControl.getAll);
router.get('/:id', WishlistControl.getById);
router.post('/', WishlistControl.create);
router.put('/:id', WishlistControl.update);
router.delete('/:id', WishlistControl.deleteById);

export default router;