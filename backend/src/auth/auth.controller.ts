import { Request, Response } from 'express';
import { User } from '../users/user.model';
import { createHash, createSalt, createToken } from './auth.service';
import '../types';
import type { TokenPayload } from '../types';

//% POST /api/auth/register ---------------------------------------------------
export async function register(req: Request, res: Response): Promise<void> {
  // console.log('req.body ', req.body);
  const { email, password, role, displayName } = req.body;
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
      role: role || 'customer',
      displayName,
    });

    await user.save();
    res.status(201).json({ success: true, message: 'user created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'server error' });
  }
}

//% POST /api/auth/login ------------------------------------------------------
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

    const payload = { user: user._id, email: user.email, role: user.role };
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
        data: { role: user.role },
      });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

//% GET /api/auth/logout ------------------------------------------------------
export function logout(req: Request, res: Response): void {
  try {
    res.clearCookie('accessCookie').clearCookie('refreshCookie').json({ success: true, message: 'logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

//% GET /api/auth/check -------------------------------------------------------
export function check(req: Request, res: Response): void {
  const payload = req.payload;
  res.json({ success: true, message: 'check successful', data: { payload: payload } });
  res.end();
}

//% GET /api/auth/refresh -----------------------------------------------------
export async function refresh(req: Request, res: Response): Promise<void> {
  const { email } = req.payload as TokenPayload;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ success: false, message: 'user not found' });
      return;
    }

    const payload = { user: user._id, email: user.email, role: user.role };
    const accessToken = createToken(payload, '1h');

    //# cookies -----------------------------------------------------------
    res
      .cookie('accessCookie', accessToken, {
        httpOnly: true,
        secure: true, //! secure für safari test rausnehmen
        // sameSite: 'none',
      })
      .json({
        success: true,
        message: 'refresh successful',
        data: { role: user.role },
      });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}
