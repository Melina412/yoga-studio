import express, { RequestHandler } from 'express';
import { createBooking } from './booking.controller';
import { checkToken } from '../auth/auth.middleware';

export const router = express.Router();

router.post('/', checkToken, createBooking as RequestHandler);
