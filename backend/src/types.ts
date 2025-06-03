import type Request from 'express';
import type { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      payload?: string | JwtPayload;
    }
  }
}

export type TokenType = 'ACCESS_TOKEN' | 'REFRESH_TOKEN';

export interface TokenPayload {
  //? -> im backend auf die userdaten aus der middleware zugreifen
  user: string;
  email: string;
  role: string;
  exp?: number;
  iat?: number;
}

export interface EventType {
  title: string;
  date: string;
  start?: string;
  end?: string;
  location?: string;
  trainer?: string;
  info?: string;
  classId?: string;
  className: string;
  status: string;
}

export {};
