import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// const FRONTEND_DIR = path.join(__dirname, '../../frontend/dist');
// app.use(express.static(FRONTEND_DIR));

export default app;
