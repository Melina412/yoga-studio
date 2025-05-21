import express, { RequestHandler } from 'express';
import { login, logout, register, check, refresh } from './auth.controller';
import { checkToken, checkRefreshToken } from './auth.middleware';

export const router = express.Router();

router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);
router.get('/logout', logout as RequestHandler);
router.get('/check', checkToken, check as RequestHandler);
router.get('/refresh', checkRefreshToken, refresh as RequestHandler);
