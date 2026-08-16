import { Router } from 'express';
import {
    getWhyNgen,
    updateWhyNgen,
    toggleWhyNgenStatus,
    resetWhyNgen,
} from '../controllers/whyNgenController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getWhyNgen);

// Admin routes
router.put('/', authenticate, updateWhyNgen);
router.put('/toggle-status', authenticate, toggleWhyNgenStatus);
router.post('/reset', authenticate, resetWhyNgen);

export default router;