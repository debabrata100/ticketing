import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@deb-ticketing/common';
import express, { Request, Response } from 'express';
import { Order } from '../models/order';
import logger from '../logger/logger';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
    }
    logger.info(
      `Fetched order with id ${order.id} for user ${req.currentUser.id}`
    );
    res.send(order);
  }
);

export { router as showOrdersRouter };
