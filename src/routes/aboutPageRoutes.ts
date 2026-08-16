import { Router } from 'express';
import {
    getAboutPage,
    updateAboutPage,
    toggleAboutPageStatus,
    resetAboutPage,
} from '../controllers/aboutPageController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getAboutPage);

// Admin routes
router.put('/', authenticate, updateAboutPage);
router.put('/toggle-status', authenticate, toggleAboutPageStatus);
router.post('/reset', authenticate, resetAboutPage);

export default router;