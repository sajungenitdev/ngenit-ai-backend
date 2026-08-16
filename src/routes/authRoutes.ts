import { Router } from 'express';
import { login, verify, logout } from '../controllers/authController';
import { validateLogin } from '../middleware/validation';

const router = Router();

router.post('/login', validateLogin, login);
router.get('/verify', verify);
router.post('/logout', logout);

export default router;