import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('fetches the order', async () => {
  const user = global.signin();
  // create a ticket
  const ticket = Ticket.build({
    title: 'The Samsung',
    price: 100,
  });
  await ticket.save();
  // build a order with the ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // fetch the order
  const response = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send({})
    .expect(200);
  expect(response.body.id).toEqual(order.id);
  expect(response.body.ticket.id).toEqual(ticket.id);
  expect(response.body.ticket.title).toEqual(ticket.title);
});

it('returns an error id one user fetch another user order', async () => {
  const user = global.signin();
  // create a ticket
  const ticket = Ticket.build({
    title: 'The Samsung',
    price: 100,
  });
  await ticket.save();
  // build a order with the ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send({})
    .expect(401);
});
