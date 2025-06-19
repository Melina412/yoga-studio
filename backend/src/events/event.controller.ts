import { Request, Response } from 'express';
import { Event } from './event.model';
import '../types';
import { EventType } from '../types';

//% POST /api/events
export async function createEvent(req: Request, res: Response): Promise<void> {
  const events = req.body as EventType[];
  console.log(
    'req events: ',
    events[0].title,
    events.map((e) => e.date)
  );

  try {
    const docs = await Event.insertMany(events);
    res.status(201).json({ success: true, message: `${docs.length} event(s) created`, data: { events: events } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}

//% GET /api/events
// alle events einmal senden, dann auf client seite (indexed db??) speichern und filtern

export async function getEvents(req: Request, res: Response): Promise<void> {
  try {
    const events = await Event.find();
    // console.log('events: ', events);

    res.status(201).json({ success: true, message: 'events found', data: { events: events } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}
