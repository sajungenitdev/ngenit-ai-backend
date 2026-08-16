import { Router } from 'express';
import {
    getTrustBar,
    createTrustBar,
    updateTrustBar,
    toggleTrustBarStatus,
    resetTrustBar,
    deleteTrustBar,
} from '../controllers/trustBarController';
import { authenticate } from '../middleware/auth';
import { validateTrustBar } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getTrustBar);

// Admin routes
router.post('/', authenticate, validateTrustBar, createTrustBar);
router.put('/', authenticate, validateTrustBar, updateTrustBar);
router.put('/toggle-status', authenticate, toggleTrustBarStatus);
router.post('/reset', authenticate, resetTrustBar);
router.delete('/', authenticate, deleteTrustBar);

export default router;