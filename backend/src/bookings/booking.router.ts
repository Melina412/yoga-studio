import express, { RequestHandler } from 'express';
import { createBooking, getUserBookings } from './booking.controller';
import { checkToken } from '../auth/auth.middleware';

export const router = express.Router();

router.post('/', checkToken, createBooking as RequestHandler);
router.get('/user', checkToken, getUserBookings as RequestHandler);
