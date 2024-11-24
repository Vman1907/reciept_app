import express from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import {
	createReceipt,
	deleteReceipt,
	generateReceiptPDF,
	getReceipts,
	updateReceipt,
} from './receipt.controller';

const router = express.Router();

router.route('/').all(authenticate).get(getReceipts).post(createReceipt);
router.route('/dashboard-data').all(authenticate).get(getReceipts)
router.route('/:id').all(authenticate).put(updateReceipt).delete(deleteReceipt);
router.route('/:id/download').all(authenticate).get(generateReceiptPDF);

export default router;
