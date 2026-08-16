import { Router } from 'express';
import {
    getIndustries,
    getIndustryById,
    createIndustry,
    updateIndustry,
    deleteIndustry,
    toggleIndustryStatus,
} from '../controllers/industryController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getIndustries);
router.get('/:id', getIndustryById);

// Admin routes
router.post('/', authenticate, createIndustry);
router.put('/:id', authenticate, updateIndustry);
router.put('/:id/toggle-status', authenticate, toggleIndustryStatus);
router.delete('/:id', authenticate, deleteIndustry);

export default router;