import express from 'express'
import * as UserControl from './user.controller.js'
import { authenticateToken } from '../middleware/auth_user.middleware.js'; 
import { authorizeRoles } from '../middleware/auth_role.middleware.js';

const router = express.Router();

// Main User-----------------------------------------
router.get('/', authenticateToken, authorizeRoles('Admin'), UserControl.getAll);
router.get('/:id',authenticateToken, UserControl.getById);
router.post('/', UserControl.create);
router.put('/:id', authenticateToken, UserControl.update);
router.delete('/:id', authenticateToken, UserControl.deleteById);

export default router;