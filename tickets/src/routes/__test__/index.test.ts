import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', global.signin()).send({
    title: 'test title 1',
    price: 10,
  });
};

it('has a route handler listening to /api/tickets from get requests', async () => {
  const response = await request(app).get('/api/tickets').send({});
  expect(response.statusCode).not.toEqual(404);
});

it('can fetch list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get('/api/tickets').send().expect(200);
  expect(response.body.length).toEqual(3);

  // console.log(response.body);
});
