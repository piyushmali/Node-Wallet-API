import express from 'express';
import { transfer, transactionHistory } from '../controllers/transactionController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/transfer', authenticate, transfer);
router.get('/history', authenticate, transactionHistory);

export default router;
