import { Router } from 'express';
import {
    getContactPage,
    updateContactPage,
    toggleContactPageStatus,
    resetContactPage,
    submitContactForm,
} from '../controllers/contactPageController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', getContactPage);
router.post('/submit', submitContactForm);

// Admin routes
router.put('/', authenticate, updateContactPage);
router.put('/toggle-status', authenticate, toggleContactPageStatus);
router.post('/reset', authenticate, resetContactPage);

export default router;