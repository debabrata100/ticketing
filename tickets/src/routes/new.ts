import { requireAuth, validateRequest } from '@deb-ticketing/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../model/ticket';
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import logger from '../logger/logger';
const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title')
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('Please provide valid title'),
    body('price')
      .notEmpty()
      .isFloat({ gt: 0 })
      .withMessage('Please Provide valid price'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser.id,
    });
    await ticket.save();
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });
    logger.info('Ticket Creation succeeded', {
      ticketId: ticket.id,
      userId: req.currentUser.id,
      requestId: req.requestId,
    });
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
