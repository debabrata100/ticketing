import request from 'supertest';
import { app } from '../../app';

it('responds with dtails of current user', async () => {
  const cookie = await global.signin();
  if (!cookie) {
    throw new Error('Cookie not setup during sinup');
  }

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toBe('test@test.com');
});

it('responds with null when not authenticated', async () => {
  const responds = request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(401);
});
