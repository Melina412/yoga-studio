import { Request, Response } from 'express';
import { User } from '../users/user.model';
import { createHash, createSalt, createToken } from './auth.service';

export async function register(req: Request, res: Response): Promise<void> {
  // console.log('req.body ', req.body);
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ success: false, message: 'email already exists in db' });
      return;
    }

    const salt = createSalt();
    const hashedPassword = createHash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      salt: salt,
      role: role || 'Customer',
    });

    await user.save();
    res.status(201).json({ success: true, message: 'user created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log({ user });
    if (!user) {
      res.status(401).json({ success: false, message: 'login failed: wrong login data' });
      return;
    }

    if (user.password !== createHash(password, user.salt)) {
      res.status(401).json({ success: false, message: 'login failed: wrong login data' });
      return;
    }

    const payload = { user: user._id, email: user.email };
    const accessToken = createToken(payload, '1h');
    const refreshToken = createToken(payload, '24h');

    //# cookies -----------------------------------------------------------
    res
      .cookie('accessCookie', accessToken, {
        httpOnly: true,
        secure: true, //! secure für safari test rausnehmen
        // sameSite: 'none',
      })
      .cookie('refreshCookie', refreshToken, {
        httpOnly: true,
        secure: true,
        // sameSite: 'none',
      })
      .json({
        success: true,
        message: 'login successful',
        data: { email: user.email },
      });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
