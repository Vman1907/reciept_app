import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';
import { Receipt } from '../models/reciepts/receipt.model';

export const generatePDF = async (receipt: Receipt): Promise<string> => {
	const doc = new PDFDocument();
	const publicDir = path.resolve(__dirname, '../../public');
	const filename = `receipt-${receipt.receiptNumber}.pdf`;
	const filepath = path.join(publicDir, filename);

	// Ensure the directory exists
	if (!fs.existsSync(publicDir)) {
		fs.mkdirSync(publicDir, { recursive: true });
	}

	return new Promise((resolve, reject) => {
		const writeStream = fs.createWriteStream(filepath);
		doc.pipe(writeStream);

		// Styles
		const boldFont = 'Helvetica-Bold';
		const regularFont = 'Helvetica';

		// Receipt Details Section
		doc
			.fontSize(12)
			.text('Receipt Number:', { continued: true })
			.font(boldFont)
			.text(` ${receipt.receiptNumber}`)
			.font(regularFont)
			.text('Date:', { continued: true })
			.font(boldFont)
			.text(` ${new Date(receipt.createdAt).toDateString()}`)
			.moveDown();

		// Customer Details Section
		doc.fontSize(12).font(regularFont).text('Customer Details', { underline: true }).moveDown(0.5);
		doc.text(`Name: ${receipt.name}`).text(`Mobile: ${receipt.mobile}`).moveDown();

		// Payment Details Section
		doc.fontSize(12).font(regularFont).text('Payment Details', { underline: true }).moveDown(0.5);
		doc.fontSize(12).text(`Amount Paid: ₹${receipt.amount}`).moveDown(2);

		// Horizontal Divider
		doc.moveTo(50, doc.y).lineTo(400, doc.y).stroke().moveDown(1);

		// Footer
		doc
			.fontSize(10)
			.font(regularFont)
			.text('Thank you for your purchase!', { align: 'center' })
			.moveDown(0.5);
		doc.text('For any queries, contact us at support@example.com', { align: 'center' });

		// Finalize PDF
		doc.end();

		writeStream.on('finish', () => resolve(filepath));
		writeStream.on('error', (error) => reject(error));
	});
};

