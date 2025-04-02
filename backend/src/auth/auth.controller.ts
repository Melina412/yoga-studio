import { Request, Response } from 'express';
import { User } from '../users/user.model';

export async function register(req: Request, res: Response): Promise<void> {
  // console.log('req.body ', req.body);
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'email already exists in db' });
      return;
    }

    const user = new User({
      email,
      password,
      salt: 'randomSalt',
      role: role || 'Customer',
    });

    await user.save();
    res.status(201).json({ success: true, message: 'user created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}
