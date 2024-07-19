import express from 'express';
import { userRegistration, userLogin, loggedUser, setAdmin } from '../controllers/userController.js';
import checkAuth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', userRegistration);
router.post('/login', userLogin);
router.get('/loggeduser', checkAuth, loggedUser);
router.patch('/setadmin', checkAuth, setAdmin);

export default router;
