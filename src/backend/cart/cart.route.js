import express from 'express'
import * as CartControl from './cart.controller.js'
import { authenticateToken } from '../middleware/auth_user.middleware.js';

const router = express.Router();

router.use(authenticateToken)
//Cart Item Book Variant-----------------------------
router.get('/variant-item', CartControl.getByCartAndVariant);

// Cart Item-----------------------------------------
router.get('/item', CartControl.getAllCartItem);
router.get('/item/:id', CartControl.getByIdCartItem);
router.post('/item/', CartControl.createCartItem);
router.put('/item/:id', CartControl.updateCartItem);
router.delete('/item/:id', CartControl.deleteByIdCartItem);

// Main Cart-----------------------------------------
router.get('/', CartControl.getAll);
router.get('/:id', CartControl.getById);
router.post('/', CartControl.create);
router.put('/:id', CartControl.update);
router.delete('/:id', CartControl.deleteById);

export default router;