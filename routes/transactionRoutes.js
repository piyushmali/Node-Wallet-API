import express from 'express';
import { transfer, transactionHistory, getAllTransactions } from '../controllers/transactionController.js';
import checkAuth from '../middlewares/authMiddleware.js';
import checkAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.post('/transfer', checkAuth, transfer);
router.get('/history', checkAuth, transactionHistory);
router.get('/all', checkAuth, checkAdmin, getAllTransactions);  // Admin route

export default router;
