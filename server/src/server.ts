import cookieParser from 'cookie-parser';
import express from 'express';
import { connectDB } from './config/db.config';
import authRoutes from './modules/auth/auth.routes';
import receiptRoutes from './modules/receipt/receipt.routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api/receipts', receiptRoutes);
app.use('/api/auth', authRoutes);

app.use('/api-status', (req, res) => {
	res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
	await connectDB();
	console.log(`Server running on port ${PORT}`);
});
