import express, { Request, Response } from 'express';
import { Ticket } from '../model/ticket';
import logger from '../logger/logger';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });
  logger.info('Fetching ticket succeeded', { userId: req.currentUser?.id });
  res.send(tickets);
});

export { router as indexTicketsRouter };
