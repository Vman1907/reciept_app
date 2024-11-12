import express from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { showAllReceipts } from './user.controller';

const router = express.Router();

router.route('/').all(authenticate).get(showAllReceipts);
// router.route('/:id').all(authenticate).put(updateReceipt).delete(deleteReceipt);
// router.route('/:id/download').all(authenticate).get(generateReceiptPDF);

export default router;
