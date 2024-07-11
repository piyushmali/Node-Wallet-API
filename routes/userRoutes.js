import express from 'express';
import { userRegistration, userLogin, loggedUser } from '../controllers/userController.js';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userLogin);
router.get('/loggeduser', checkAuth, loggedUser);

export default router;
