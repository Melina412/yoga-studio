import express, { RequestHandler } from 'express';
import { getUserData, getUsers } from './user.controller';
import { checkToken } from '../auth/auth.middleware';

export const router = express.Router();

router.get('/data', checkToken, getUserData as RequestHandler);
router.get('/', checkToken, getUsers as RequestHandler);
