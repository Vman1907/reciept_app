import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Session } from '../../models/session/session.model';
import { User } from '../../models/users/user.model';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../../utils/JWT';

export const signUp = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const userExists = await User.findOne({ where: { email } });
	if (userExists) {
		res.status(400).json({ message: 'Username already taken', success: false });
		return;
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	await User.create({
		id: crypto.randomUUID(),
		email,
		password: hashedPassword,
	});

	res.status(201).json({ message: 'User created successfully', success: true });
	return;
};

export const signIn = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ where: { email } });
		if (!user) {
			res.status(400).json({ message: 'Invalid credentials' });
			return;
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			res.status(400).json({ message: 'Invalid credentials' });
			return;
		}

		const accessToken = generateAccessToken(user.id.toString());
		const refreshToken = generateRefreshToken(user.id.toString());

		const userSession = await Session.findOne({ where: { user_id: user.id } });

		if (!userSession) {
			await Session.create({
				id: crypto.randomUUID(),
				user_id: user.id,
				expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				loginAt: new Date(),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		} else {
			await Session.update(
				{ expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
				{ where: { user_id: user.id } }
			);
		}

		res.status(200).json({
			message: 'Logged in successfully',
			success: true,
			accessToken,
			refreshToken,
		});
		return;
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Internal server error', success: false });
	}
};

export const refreshToken = async (req: Request, res: Response) => {
	const refreshToken = req.cookies['refresh-token'];

	if (!refreshToken) {
		res.status(403).json({ message: 'Refresh token is required' });
		return;
	}

	try {
		const payload = verifyRefreshToken(refreshToken);
		const newAccessToken = generateAccessToken((payload as JwtPayload).userId);

		res.status(200).json({
			message: 'Access token refreshed successfully',
			accessToken: newAccessToken,
		});
		return;
	} catch (err) {
		res.status(403).json({ message: 'Invalid refresh token' });
		return;
	}
};

export const logout = async (req: Request, res: Response) => {
	res.clearCookie('auth-token');
	res.clearCookie('refresh-token');
	await Session.destroy({ where: { id: (req as any).user.sessionId } });
	res.status(200).json({ message: 'Logged out successfully' });
	return;
};
export const validateAuth = (req: Request, res: Response) => {
	res.status(200).json({ message: 'User is authenticated', success: true });
};
