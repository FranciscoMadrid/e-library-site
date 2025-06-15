import bcrypt from 'bcrypt';
import path from 'path';
import { getByEmail, update } from '../user/user.model.js';
import sendEmail from '../../server/sendEmail.js';
import * as passwordResetModel from './reset.model.js';

const SALT_ROUNDS = 10;

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await getByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = await passwordResetModel.createToken(user.user_id);
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  const htmlContent = `
    <p>Hello ${user.first_name},</p>
    <p>You requested to reset your password. Click the link below to do so:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>If you didn't request this, you can ignore this email.</p>
  `;

  try {
    await sendEmail(email, 'Password Reset Request', htmlContent);
    res.json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
};

export const confirmPasswordReset = async (req, res) => {
  const { token, newPassword } = req.body;
  const tokenRecord = await passwordResetModel.getValidToken(token);

  if (!tokenRecord) return res.status(400).json({ message: 'Invalid or expired token' });

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await update(tokenRecord.fk_user_id, { password_hash: hashedPassword });
  await passwordResetModel.markUsed(token);

  res.json({ message: 'Password has been reset successfully' });
};