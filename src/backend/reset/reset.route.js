import express from 'express';
import * as passwordResetController from './reset.controller.js';

const router = express.Router();

router.post('/request', passwordResetController.requestPasswordReset);
router.post('/confirm', passwordResetController.confirmPasswordReset);

export default router;