import { Router } from 'express';
import {
    getCtaBanner,
    updateCtaBanner,
    toggleCtaBannerStatus,
    resetCtaBanner,
} from '../controllers/ctaBannerController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getCtaBanner);

// Admin routes
router.put('/', authenticate, updateCtaBanner);
router.put('/toggle-status', authenticate, toggleCtaBannerStatus);
router.post('/reset', authenticate, resetCtaBanner);

export default router;