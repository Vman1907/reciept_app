import { NextFunction, Request, Response } from 'express';
import { Session } from '../models/session/session.model';
import { verifyAccessToken } from '../utils/JWT';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		res.status(401).json({ message: 'Access token is required' });
		return;
	}
	const token = authHeader.split(' ')[1]; 

	if (!token) {
		res.status(401).json({ message: 'Access token is required' });
		return;
	}
	try {
		const decoded = verifyAccessToken(token);
		(req as any).user = decoded;
		const session = await Session.findOne({ where: { user_id: (decoded as any).userId } });
		if (!session) {
			res.status(401).json({ message: 'Session not found' });
			return;
		}
		next();
	} catch {
		res.status(401).json({ message: 'Invalid token' });
	}
};
