import { Router } from 'express';
import {
    getUseCases,
    getUseCaseById,
    createUseCase,
    updateUseCase,
    deleteUseCase,
    toggleUseCaseStatus,
} from '../controllers/useCaseController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getUseCases);
router.get('/:id', getUseCaseById);

// Admin routes
router.post('/', authenticate, createUseCase);
router.put('/:id', authenticate, updateUseCase);
router.put('/:id/toggle-status', authenticate, toggleUseCaseStatus);
router.delete('/:id', authenticate, deleteUseCase);

export default router;