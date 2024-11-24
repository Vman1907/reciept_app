import crypto from 'crypto';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Op } from 'sequelize';
import { Receipt } from '../../models/reciepts/receipt.model';
import { Respond, RespondFile } from '../../utils/ExpressUtils';
import { generatePDF } from '../../utils/pdfGenerator';
import { createReceiptValidator } from './receipt.validator';

export const createReceipt = async (req: Request, res: Response): Promise<void> => {
	try {
		const receiptData = req.body as createReceiptValidator;
		const lastReceipt = await Receipt.findOne({ order: [['receiptNumber', 'DESC']] });
		const receiptNumber = lastReceipt ? lastReceipt.receiptNumber + 1 : 1;
		console.log(receiptData, (req as any).user.userId);
		const newReceipt = await Receipt.create({
			...receiptData,
			user_id: (req as any).user.userId,
			receiptNumber,
			id: crypto.randomUUID(),
			date: new Date(),
		});

		res.status(201).json({ receipt: newReceipt, success: true });
		return;
	} catch (error) {
		console.log(error);
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
		console.log(error);
		res.status(500).json({ error: 'Failed to fetch receipts' });
	}
};

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
	try {
		const receipts = await Receipt.findAll({ where: { user_id: (req as any).user.userId } });
		const sortedReceipts = receipts.sort((a, b) => {
			return a.date.getTime() - b.date.getTime();
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

		await receipt.update(updatedData);
		Respond({
			res,
			status: 200,
			data: receipt,
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

		await receipt.destroy();
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

		const pdf = fs.readFileSync(pdfPath);
		res.contentType('application/pdf');
		res.send(pdf);

		RespondFile({
			res,
			filename: `receipt-${receipt.receiptNumber}.pdf`,
			filepath: pdfPath,
		});

		fs.unlinkSync(pdfPath);
	} catch (error) {
		res.status(500).json({ error: 'Failed to generate PDF' });
		return;
	}
};
