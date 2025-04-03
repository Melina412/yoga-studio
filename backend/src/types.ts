declare global {
  namespace Express {
    interface Request {
      payload?: any;
    }
  }
}

export type TokenType = 'ACCESS_TOKEN' | 'REFRESH_TOKEN';
