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
