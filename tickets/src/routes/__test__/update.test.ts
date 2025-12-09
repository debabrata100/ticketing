import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

import { natsWrapper } from '../../nats-wrapper';
import { Ticket } from '../../model/ticket';

it('returns a 404 if provided ticket does not exist', async () => {
  const ticketId = await new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sddsds',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if user does not exist', async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.signin())
    .send({
      title: 'abcde',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'xyz',
      price: 25,
    })
    .expect(401);
});

it('returns a 400 if user provide an invalid title or price', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'abcde',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 25,
    })
    .expect(400);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'xyz',
      price: -10,
    })
    .expect(400);
});

it('update a ticket information when provided valid inputs', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'abcde',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'xyz',
      price: 25,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();
  expect(ticketResponse.body.title).toEqual('xyz');
  expect(ticketResponse.body.price).toEqual(25);
});

it('published an event after ticket update', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'abcde',
      price: 20,
    });
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'xyz',
      price: 25,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects tiket update is ticket is reserved', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'abcde',
      price: 20,
    });

  const ticket = await Ticket.findById(response.body.id);
  ticket?.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket?.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'xyz',
      price: 25,
    })
    .expect(400);
});
