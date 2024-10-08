import { z } from 'zod';

export const signUpSchema = z.object({
	email: z.string().min(3, 'Username must be at least 3 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signInSchema = z.object({
	email: z.string().min(3, 'Username must be at least 3 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
});
