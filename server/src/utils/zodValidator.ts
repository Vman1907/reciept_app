import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export const validateRequest = (schema: z.ZodSchema) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const formattedErrors = error.errors.map((err) => ({
					path: err.path.join('.'),
					message: err.message,
				}));
				res.status(400).json({ errors: formattedErrors });
				return;
			}
			next(error);
		}
	};
};
