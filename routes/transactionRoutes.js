import express from 'express';
import { transfer, transactionHistory } from '../controllers/transactionController.js';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/transfer', transfer);
router.get('/history', checkAuth, transactionHistory);

export default router;
