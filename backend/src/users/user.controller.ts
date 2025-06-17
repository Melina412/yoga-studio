import { Request, Response } from 'express';
import { User } from './user.model';
import '../types';
import { TokenPayload } from '../types';
// import { Event } from '../events/event.model';

//% GET /api/users/data
// user finden
// user events finden
// user daten finden

export async function getUserData(req: Request, res: Response): Promise<void> {
  const payload = req.payload as TokenPayload;
  console.log('payload: ', payload);

  try {
    const user = await User.findById(payload.user);
    console.log('user: ', user);

    res.status(201).json({ success: true, message: 'user found', data: { user: user } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}

//% POST /api/users
// route von admin dashboard
export async function getUsers(req: Request, res: Response): Promise<void> {
  const payload = req.payload as TokenPayload;

  if (payload.role !== 'admin') {
    res.status(401).json({ success: false, message: 'unauthorized' });
    return;
  }

  try {
    const users = await User.find();
    console.log('users: ', users);

    res.status(201).json({ success: true, message: 'users found', data: { users: users } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}
