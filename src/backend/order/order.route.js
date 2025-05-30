import express from 'express'
import * as OrderControl from './order.controller.js'

const router = express.Router();

// Main Order-----------------------------------------
router.get('/', OrderControl.getAll);
router.get('/:id', OrderControl.getById);
router.post('/', OrderControl.create);
router.put('/:id', OrderControl.update);
router.delete('/:id', OrderControl.deleteById);

export default router;