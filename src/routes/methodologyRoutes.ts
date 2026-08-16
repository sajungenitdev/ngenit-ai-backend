import { Router } from 'express';
import {
    getMethodology,
    getMethodologyById,
    createMethodologyStep,
    updateMethodologyStep,
    deleteMethodologyStep,
    toggleMethodologyStatus,
} from '../controllers/methodologyController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getMethodology);
router.get('/:id', getMethodologyById);

// Admin routes
router.post('/', authenticate, createMethodologyStep);
router.put('/:id', authenticate, updateMethodologyStep);
router.put('/:id/toggle-status', authenticate, toggleMethodologyStatus);
router.delete('/:id', authenticate, deleteMethodologyStep);

export default router;