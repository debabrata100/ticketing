import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../model/ticket';
import mongoose from 'mongoose';

it('returns 400 if a ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});

it('should return current ticket for a given ticket id', async () => {
  const ticketTitle = 'My Home Show';
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: ticketTitle,
      price: 10,
    })
    .expect(201);
  const tickets = await Ticket.find({});
  const ticketId = tickets[0].id;
  const response = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signin())
    .send();
  const { id, title, price } = response.body;
  expect(id).toEqual(ticketId);
  expect(title).toEqual(ticketTitle);
  expect(price).toEqual(10);
});
