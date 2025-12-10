import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listeners';
import { OrderCreatedListener } from './events/listeners/order-created-listeners';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_ClSTER_ID) {
    throw new Error('NATS_ClSTER_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_ClIENT_ID) {
    throw new Error('NATS_ClIENT_ID must be defined');
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_ClSTER_ID,
      process.env.NATS_ClIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI);
    console.log('connnected to db');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log(`Auth listening at 3000`);
  });
};

start();
