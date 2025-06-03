import express, { RequestHandler } from 'express';

import { createEvent, getEvents } from './event.controller';

export const router = express.Router();

router.post('/', createEvent as RequestHandler);
router.get('/', getEvents as RequestHandler);
