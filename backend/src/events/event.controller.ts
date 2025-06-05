import { Request, Response } from 'express';
import { Event } from './event.model';
import '../types';
import { EventType } from '../types';

//% POST /api/events
export async function createEvent(req: Request, res: Response): Promise<void> {
  const {
    title,
    date,
    start,
    end,
    location,
    trainer,
    info,
    classId,
    className,
    status,
    recurring,
    daysOfWeek,
    startTime,
    endTime,
    startRecur,
    endRecur,
    groupId,
  } = req.body as EventType;
  console.log('req.body ', req.body);

  try {
    const event = new Event({
      title,
      date,
      start,
      end,
      location,
      trainer,
      info,
      classId,
      className,
      status,
      recurring,
      daysOfWeek,
      startTime,
      endTime,
      startRecur,
      endRecur,
      groupId,
    });
    await event.save();

    res.status(201).json({ success: true, message: 'event created', data: { event: event } });
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
    console.log('events: ', events);

    res.status(201).json({ success: true, message: 'events found', data: { events: events } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}

//% GET /api/events/user
// gebuchte events eines users
//!  aus den user daten nehmen
