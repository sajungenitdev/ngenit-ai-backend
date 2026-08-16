import { Router } from 'express';
import {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
} from '../controllers/serviceController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getServices);
router.get('/:id', getServiceById);

// Admin routes (authentication required)
router.post('/', authenticate, createService);
router.put('/:id', authenticate, updateService);
router.put('/:id/toggle-status', authenticate, toggleServiceStatus);
router.delete('/:id', authenticate, deleteService);

export default router;