import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

import { router as authRouter } from './src/auth/auth.router';
import { router as eventRouter } from './src/events/event.router';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// const FRONTEND_DIR = path.join(__dirname, '../../frontend/dist');
// app.use(express.static(FRONTEND_DIR));

app.use('/api/auth', authRouter);
app.use('/api/events', eventRouter);

export default app;
