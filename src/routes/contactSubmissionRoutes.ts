import { Router } from 'express';
import {
    getSubmissions,
    getSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    deleteMultipleSubmissions,
} from '../controllers/contactSubmissionController';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getSubmissions);
router.get('/:id', getSubmission);
router.put('/:id/status', updateSubmissionStatus);
router.delete('/:id', deleteSubmission);
router.post('/delete-multiple', deleteMultipleSubmissions);

export default router;