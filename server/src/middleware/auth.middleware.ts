import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../utils/JWT';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies['auth-token'];
	console.log(token);
	if (!token) {
		res.status(401).json({ message: 'Access token is required' });
		return;
	}

	try {
		const decoded = verifyAccessToken(token);
		(req as any).user = decoded;
		next();
	} catch (err) {
		res.status(403).json({ message: 'Invalid access token', success: false });
		return;
	}
};
