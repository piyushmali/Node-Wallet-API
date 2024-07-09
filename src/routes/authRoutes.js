import express from 'express';
import { signup, verifyEmail, login } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/verify-email', verifyEmail);
router.post('/login', login);

export default router;
