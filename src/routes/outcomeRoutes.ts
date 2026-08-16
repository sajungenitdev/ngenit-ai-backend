import { Router } from 'express';
import {
    getOutcomes,
    getOutcomeById,
    createOutcome,
    updateOutcome,
    deleteOutcome,
    toggleOutcomeStatus,
} from '../controllers/outcomeController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getOutcomes);
router.get('/:id', getOutcomeById);

// Admin routes
router.post('/', authenticate, createOutcome);
router.put('/:id', authenticate, updateOutcome);
router.put('/:id/toggle-status', authenticate, toggleOutcomeStatus);
router.delete('/:id', authenticate, deleteOutcome);

export default router;