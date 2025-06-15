import express from 'express'
import * as OrderControl from './order.controller.js'
import { authenticateToken } from '../middleware/auth_user.middleware.js';

const router = express.Router();

router.use(authenticateToken);

// Order History-----------------------------------------
router.get('/history', OrderControl.getAllOrderHistory);
router.get('/history/:id', OrderControl.getByIdOrderHistory);
router.post('/history', OrderControl.createOrderHistory);
router.put('/history/:id', OrderControl.updateOrderHistory);
router.delete('/history/:id', OrderControl.deleteByIdOrderHistory);
// Order Item-----------------------------------------
router.get('/item', OrderControl.getAllOrderItem);
router.get('/item/:id', OrderControl.getByIdOrderItem);
router.post('/item', OrderControl.createOrderItem);
router.put('/item/:id', OrderControl.updateOrderItem);
router.delete('/item/:id', OrderControl.deleteByIdOrderItem);
// Main Order-----------------------------------------
router.get('/', OrderControl.getAll);
router.get('/:id', OrderControl.getById);
router.post('/', OrderControl.create);
router.put('/:id', OrderControl.update);
router.delete('/:id', OrderControl.deleteById);

export default router;