import { OrderCancelledEvent, OrderStatus } from '@deb-ticketing/common';
import { natsWrapper } from '../../../nats-wrapper';

import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';
import { OrderCancelledListener } from '../order-cancelled-listeners';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    userId: 'dsadasd',
    price: 10,
    status: OrderStatus.Created,
  });
  await order.save();
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: order.version + 1,
    ticket: {
      id: 'dsdsdsd',
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('cancels an order', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(data.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('ack the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
