import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';
import { Receipt } from '../models/reciepts/receipt.model';

export const generatePDF = async (receipt: Receipt): Promise<string> => {
	const doc = new PDFDocument();
	const filename = `receipt-${receipt.receiptNumber}.pdf`;
	const filepath = path.join(__dirname, `../../public/${filename}`);
	doc.pipe(fs.createWriteStream(filepath));

	doc.fontSize(25).text('Receipt', { align: 'center' });
	doc.fontSize(15).text(`Receipt Number: ${receipt.receiptNumber}`);
	doc.fontSize(15).text(`Name: ${receipt.name}`);
	doc.fontSize(15).text(`Mobile: ${receipt.mobile}`);
	doc.fontSize(15).text(`Amount: ${receipt.amount}`);
	doc.fontSize(15).text(`Date: ${receipt.date}`);

	doc.end();
	return filepath;
};
