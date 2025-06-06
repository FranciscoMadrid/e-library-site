import express from 'express'
import * as AuthController from './authentication.controller.js'

const router = express.Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);

export default router