import { Router } from 'express';
import {
    getHeroBanner,
    createHeroBanner,
    updateHeroBanner,
    toggleHeroBannerStatus,
    resetHeroBanner,
    deleteHeroBanner,
} from '../controllers/heroController';
import { authenticate } from '../middleware/auth';
import { validateHeroBanner } from '../middleware/validation';

const router = Router();

// Public routes
router.get('/', getHeroBanner);

// Admin routes
router.post('/', authenticate, validateHeroBanner, createHeroBanner);
router.put('/', authenticate, validateHeroBanner, updateHeroBanner);
router.put('/toggle-status', authenticate, toggleHeroBannerStatus);
router.post('/reset', authenticate, resetHeroBanner);
router.delete('/', authenticate, deleteHeroBanner);

export default router;