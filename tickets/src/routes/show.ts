import { NotFoundError } from '@deb-ticketing/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../model/ticket';
import logger from '../logger/logger';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new NotFoundError();
  }
  logger.info('Show ticket succeeded', { ticketId: ticket.id });
  res.status(200).send(ticket);
});

export { router as showTicketRouter };
