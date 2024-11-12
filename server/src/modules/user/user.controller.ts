import { Request, Response } from 'express';
import { Receipt } from '../../models/reciepts/receipt.model';
import { Respond } from '../../utils/ExpressUtils';

export const showAllReceipts = async (req: Request, res: Response): Promise<void> => {
	try {
		const receipts = await Receipt.findAll({ where: { user_id: (req as any).user.userId } });
		console.log(receipts);
		Respond({
			res,
			status: 200,
			data: receipts,
		});
		return;
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch receipts' });
		return;
	}
};
