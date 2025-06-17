import { Request, Response } from 'express';
import { TokenPayload } from '../types';
import { Booking } from './booking.model';
import { User } from '../users/user.model';
import { Event } from '../events/event.model';

export async function createBooking(req: Request, res: Response): Promise<void> {
  const payload = req.payload as TokenPayload;
  console.log('payload: ', payload);

  try {
    const user = await User.findById(payload.user);
    // console.log('user: ', user);

    if (!user) {
      res.status(401).json({ success: false, message: 'user not found' });
      return;
    }

    const event = await Event.findById(req.body.event);
    // console.log('event: ', event);

    if (!event) {
      res.status(401).json({ success: false, message: 'event not found' });
      return;
    }

    const booking = new Booking({
      event: event,
      user: user,
    });
    await booking.save();
    // console.log('booking: ', booking);
    //? Warum wird hier bei event das gesamte document als ref gespeichert, aber bei user nur die id?
    // -> WEIL ICH IM MODEL 'user' UND NICHT 'User' EXPORTTIERT HATTE LMAO

    res.status(201).json({ success: true, message: 'booking created', data: { booking: booking } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}
