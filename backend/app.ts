import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

import { router as authRouter } from './src/auth/auth.router';
import { router as eventRouter } from './src/events/event.router';
import { router as userRouter } from './src/users/user.router';
import { router as bookingRouter } from './src/bookings/booking.router';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// FOR PRODUCTION -------------------------------------------------------------
const PROJECT_ROOT = process.cwd();
const directory = __dirname; // -> /app/dist/server.js
const FRONTEND_DIR = path.join(__dirname, '../frontend/dist'); // -> /app/frontend/dist
// in der Dockerfile wird das backend zu app des runtime containers
// das frontend wird dann nach frontend/dist IM app ordner kopiert
// die pfade unterscheiden sich also zum lokalen projektaufbau

app.use(express.static(FRONTEND_DIR));

console.log({ PROJECT_ROOT });
console.log({ directory });
console.log({ FRONTEND_DIR });
// ----------------------------------------------------------------------------

app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);
app.use('/api/bookings', bookingRouter);

export default app;
