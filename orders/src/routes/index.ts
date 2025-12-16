import { requireAuth } from '@deb-ticketing/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import logger from '../logger/logger';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser.id,
  }).populate('ticket');

  logger.info(`Fetched orders for user`, {
    userId: req.currentUser.id,
    requestId: req.requestId,
  });
  res.send(orders);
});

export { router as indexOrdersRouter };
