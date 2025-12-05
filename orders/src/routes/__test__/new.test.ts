import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { OrderStatus, Order } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('returns an error if ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if ticket already reserved', async () => {
  const ticket = Ticket.build({
    title: 'The Wolverine',
    price: 100,
  });
  await ticket.save();

  const order = Order.build({
    userId: '12334',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});
it('reserves a ticket', async () => {
  const ticket = Ticket.build({
    title: 'The Wolverine',
    price: 100,
  });
  await ticket.save();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({
      ticketId: ticket.id,
    })
    .expect(201);
});

it.todo('emits an order created event');
