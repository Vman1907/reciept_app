import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
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
		email,
		password: hashedPassword,
	});

	res.status(201).json({ message: 'User created successfully', success: true });
	return;
};

export const signIn = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		console.log(email, password);

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

		res.cookie('auth-token', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
		res.cookie('refresh-token', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

		res.status(200).json({ message: 'Logged in successfully', success: true });
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
		const newAccessToken = generateAccessToken((payload as any).userId);

		res.cookie('auth-token', newAccessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
		res.status(200).json({ message: 'Access token refreshed successfully' });
		return;
	} catch (err) {
		res.status(403).json({ message: 'Invalid refresh token' });
		return;
	}
};

export const logout = (req: Request, res: Response) => {
	res.clearCookie('auth-token');
	res.clearCookie('refresh-token');
	res.status(200).json({ message: 'Logged out successfully' });
	return;
};
export const validateAuth = (req: Request, res: Response) => {
	res.status(200).json({ message: 'User is authenticated', success: true });
};
