import { Router } from 'express';
import {
    getTrustBar,
    createTrustBar,
    updateTrustBar,
    toggleTrustBarStatus,
    resetTrustBar,
    deleteTrustBar,
} from '../controllers/trustBarController';

const router = Router();

router.get('/', getTrustBar);
router.post('/', createTrustBar);
router.put('/', updateTrustBar);
router.put('/toggle-status', toggleTrustBarStatus);
router.post('/reset', resetTrustBar);
router.delete('/', deleteTrustBar);

export default router;