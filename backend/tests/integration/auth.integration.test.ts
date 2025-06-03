import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../../app';
import { User } from '../../src/users/user.model';
// import { createSalt, createHash } from '../../src/auth/auth.service'; // muss das drin bleiben für github??
import 'dotenv/config';

process.env.JWT_SECRET = 'secret';

//# POST /api/auth/register ---------------------------------------------------
describe('POST /api/auth/register', () => {
  it('should save a new user to the database', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'newuser@example.com', password: 'testpassword' });
    // console.log(res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'user created');

    const user = await User.findOne({ email: 'newuser@example.com' });
    expect(user).not.toBeNull();
    expect(user?.email).toBe('newuser@example.com');
  });
});

//# POST /api/auth/login ------------------------------------------------------
describe('POST /api/auth/login', () => {
  //$ 1. user not found
  it('should return 401 if email is not found', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'testpassword' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'login failed: wrong login data');
  });

  //$ 2. incorrect password
  it('should return 401 if password is incorrect', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'login failed: wrong login data');
  });

  //$ 3. successful login
  it('should log in a user and set cookies', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'testuser@example.com', password: 'testpassword' });
    // console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'login successful');

    let cookies = res.headers['set-cookie'] as unknown; // ts error bei string[]

    // unknown wieder zu string[] konvertieren
    if (typeof cookies === 'string') {
      cookies = [cookies];
    }

    if (!Array.isArray(cookies)) {
      throw new Error('no cookies set or wrong cookie format');
    }
    // console.log('cookies:', cookies);

    expect(cookies).toBeDefined();
    expect(cookies.length).toBeGreaterThanOrEqual(2);

    const accessCookie = cookies.find((cookie: string) => cookie.startsWith('accessCookie='));
    expect(accessCookie).toBeDefined();

    const refreshCookie = cookies.find((cookie: string) => cookie.startsWith('refreshCookie='));
    expect(refreshCookie).toBeDefined();
  });
});
