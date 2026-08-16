import { Router } from 'express';
import {
    getSolutions,
    getSolutionById,
    createSolution,
    updateSolution,
    deleteSolution,
    toggleSolutionStatus,
} from '../controllers/solutionController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getSolutions);
router.get('/:id', getSolutionById);

// Admin routes
router.post('/', authenticate, createSolution);
router.put('/:id', authenticate, updateSolution);
router.put('/:id/toggle-status', authenticate, toggleSolutionStatus);
router.delete('/:id', authenticate, deleteSolution);

export default router;