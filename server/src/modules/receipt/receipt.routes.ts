import express from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import {
	changeReceiptStartNumber,
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
router.route('/:id/download').get(generateReceiptPDF);
router.route('/start-number').post(changeReceiptStartNumber);

export default router;
