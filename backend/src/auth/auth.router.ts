import express, { RequestHandler } from 'express';
import { register } from './auth.controller';

export const router = express.Router();

router.post('/register', register as RequestHandler);
