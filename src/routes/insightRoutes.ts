import { Router } from 'express';
import {
    getInsights,
    getInsightById,
    createInsight,
    updateInsight,
    deleteInsight,
    toggleInsightStatus,
    getCategories,
} from '../controllers/insightController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getInsights);
router.get('/categories', getCategories);
router.get('/:id', getInsightById);

// Admin routes
router.post('/', authenticate, createInsight);
router.put('/:id', authenticate, updateInsight);
router.put('/:id/toggle-status', authenticate, toggleInsightStatus);
router.delete('/:id', authenticate, deleteInsight);

export default router;