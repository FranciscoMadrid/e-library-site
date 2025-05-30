import express from 'express'
import * as UserControl from './user.controller.js'

const router = express.Router();

// Main User-----------------------------------------
router.get('/', UserControl.getAll);
router.get('/:id', UserControl.getById);
router.post('/', UserControl.create);
router.put('/:id', UserControl.update);
router.delete('/:id', UserControl.deleteById);

export default router;