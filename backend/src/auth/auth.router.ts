import express, { RequestHandler } from 'express';
import { login, logout, register } from './auth.controller';

export const router = express.Router();

router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);
router.get('/logout', logout as RequestHandler);
