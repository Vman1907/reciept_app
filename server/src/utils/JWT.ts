import jwt from 'jsonwebtoken';

const accessTokenSecret = 'ACCESS_TOKEN_SECRET';
const refreshTokenSecret = 'REFRESH_TOKEN_SECRET';

export const generateAccessToken = (userId: string) => {
	return jwt.sign({ userId }, accessTokenSecret, { expiresIn: '1d' });
};

export const generateRefreshToken = (userId: string) => {
	return jwt.sign({ userId }, refreshTokenSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, refreshTokenSecret);
};
