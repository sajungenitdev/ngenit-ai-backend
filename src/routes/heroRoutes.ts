import { Router } from 'express';
import {
    getHeroBanner,
    createHeroBanner,
    updateHeroBanner,
    toggleHeroBannerStatus,
    deleteHeroBanner,
} from '../controllers/heroController';
// import { authenticate } from '../middleware/auth'; // Comment out for now

const router = Router();

// All routes - public for testing
router.get('/', getHeroBanner);
router.post('/', createHeroBanner);  // No auth
router.put('/', updateHeroBanner);   // No auth
router.put('/toggle-status', toggleHeroBannerStatus);
router.delete('/', deleteHeroBanner);

export default router;