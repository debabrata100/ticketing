import mongoose from 'mongoose';
import {
  BadrequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@deb-ticketing/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFoundError();
    }
    // check order is slready reserved
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadrequestError('Ticket is already exist');
    }

    // SET EXPIRATION DATE
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // build the order and save it to database
    const order = Order.build({
      userId: req.currentUser.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    // publish event
    res.status(201).send(order);
  }
);

export { router as newOrdersRouter };
