import { Router } from 'express';
import { authenticate } from '../../middleware/auth.middleware';
import { validateRequest } from '../../utils/zodValidator';
import { logout, refreshToken, signIn, signUp, validateAuth } from './auth.controller';
import { signInSchema, signUpSchema } from './auth.validator';

const router = Router();

router.post('/signup', validateRequest(signUpSchema), signUp);

router.post('/signin', validateRequest(signInSchema), signIn);

router.post('/refresh-token', refreshToken);

router.post('/logout', logout);

router.get('/validate', authenticate, validateAuth);

export default router;
