import crypto from 'crypto';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Op, SequelizeScopeError } from 'sequelize';
import { Receipt } from '../../models/reciepts/receipt.model';
import { User } from '../../models/users/user.model';
import { Respond, RespondFile } from '../../utils/ExpressUtils';
import { generatePDF } from '../../utils/pdfGenerator';
import { createReceiptValidator } from './receipt.validator';

export const createReceipt = async (req: Request, res: Response): Promise<void> => {
	try {
		const receiptData = req.body as createReceiptValidator;
		const user = await User.findByPk((req as any).user.userId);
		const lastReceipt = await Receipt.findOne({ order: [['receiptNumber', 'DESC']] });

		if (!user) {
			res.status(404).json({ error: 'User not found' });
			return;
		}

		if (!lastReceipt) {
			console.log('called 1');
			const newReceipt = await Receipt.create({
				...receiptData,
				user_id: (req as any).user.userId,
				receiptNumber: user.receiptStartNumber + 1,
				id: crypto.randomUUID(),
			});

			res.status(201).json({ receipt: newReceipt, success: true });
			return;
		}

		if (lastReceipt.createdAt > user.receiptUpdatedAt) {
			console.log('called 2');
			const newReceipt = await Receipt.create({
				...receiptData,
				user_id: (req as any).user.userId,
				receiptNumber: lastReceipt.receiptNumber + 1,
				id: crypto.randomUUID(),
			});

			res.status(201).json({ receipt: newReceipt, success: true });
			return;
		}
		console.log(lastReceipt.createdAt, user.receiptUpdatedAt, 'called 3');

		const newReceipt = await Receipt.create({
			...receiptData,
			user_id: (req as any).user.userId,
			receiptNumber: user.receiptStartNumber + 1,
			id: crypto.randomUUID(),
		});

		res.status(201).json({ receipt: newReceipt, success: true });
		return;
	} catch (error) {
		console.log((error as any).original.errno);
		if ((error as any)?.original?.errno === 19) {
			res.status(400).json({ error: 'Receipt number already exists' });
			return;
		}
		res.status(500).json({ error: 'Failed to create receipt' });
		return;
	}
};

export const getReceipts = async (req: Request, res: Response): Promise<void> => {
	try {
		const { search } = req.query;
		const whereCondition = search
			? {
					[Op.or]: [
						{ name: { [Op.like]: `%${search}%` } },
						{ mobile: { [Op.like]: `%${search}%` } },
					],
			  }
			: {};

		const receipts = await Receipt.findAll({ where: whereCondition });
		Respond({ res, status: 200, data: { receipts } });
		return;
	} catch (error) {
		console.log((error as SequelizeScopeError).message);
		res.status(500).json({ error: 'Failed to fetch receipts' });
	}
};

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
	try {
		const receipts = await Receipt.findAll({ where: { user_id: (req as any).user.userId } });
		const sortedReceipts = receipts.sort((a, b) => {
			return a.createdAt.getTime() - b.createdAt.getTime();
		});
		const topSixReceipts = sortedReceipts.slice(0, 6);
		Respond({
			res,
			status: 200,
			data: topSixReceipts,
		});
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch receipts' });
		return;
	}
};

export const updateReceipt = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		const receipt = await Receipt.findByPk(id);
		if (!receipt) {
			res.status(404).json({ error: 'Receipt not found' });
			return;
		}

		const newReceipt = await receipt.update(updatedData);
		Respond({
			res,
			status: 200,
			data: newReceipt.dataValues,
		});
		return;
	} catch (error) {
		res.status(500).json({ error: 'Failed to update receipt' });
		return;
	}
};

export const deleteReceipt = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const receipt = await Receipt.findByPk(id);
		if (!receipt) {
			Respond({ res, status: 404, data: { error: 'Receipt not found' } });
			return;
		}

		const data = await receipt.destroy();

		console.log(data);
		Respond({
			res,
			status: 200,
			data: { message: 'Receipt deleted successfully' },
		});
		return;
	} catch (error) {
		res.status(500).json({ error: 'Failed to delete receipt' });
		return;
	}
};

export const generateReceiptPDF = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const receipt = await Receipt.findByPk(id);

		if (!receipt) {
			res.status(404).json({ error: 'Receipt not found' });
			return;
		}

		const pdfPath = await generatePDF(receipt);

		console.log(pdfPath);

		RespondFile({
			res,
			filename: `receipt-${receipt.receiptNumber}.pdf`,
			filepath: pdfPath,
		});

		// Delay file deletion to ensure the client has downloaded it
		setTimeout(() => {
			fs.unlinkSync(pdfPath);
		}, 10000);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to generate PDF' });
	}
};

export const changeReceiptStartNumber = async (req: Request, res: Response): Promise<void> => {
	try {
		const { startNumber } = req.body;
		const id = (req as any).user.userId;

		await User.update(
			{ receiptStartNumber: startNumber, receiptUpdatedAt: new Date() },
			{ where: { id } }
		);

		res.status(200).json({ message: 'Receipt start number updated successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update receipt start number' });
	}
};
