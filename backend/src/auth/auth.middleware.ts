import { verifyToken } from './auth.service';
import type { Request, Response, NextFunction } from 'express';

export function checkToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessCookie;
  token ? console.log('checkToken: ✅', token.slice(-5)) : console.log('checkToken: ❌, no access token');
  try {
    req.payload = verifyToken(token);
    console.log('access token payload:', req.payload);
    next();
  } catch (error) {
    console.log('checkToken: ❌', error.message);
    res.status(401).end();
  }
}

export function checkRefreshToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.refreshCookie;
  token
    ? console.log('checkRefreshToken: ✅', token.slice(-5))
    : console.log('checkRefreshToken: ❌, no refresh token');
  try {
    req.payload = verifyToken(token);
    // console.log('refresh token payload:', req.payload);
    next();
  } catch (error) {
    console.log('checkRefreshToken: ❌', error.message);
    res.status(401).end();
  }
}
