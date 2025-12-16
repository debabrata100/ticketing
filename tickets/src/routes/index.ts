import express, { Request, Response } from 'express';
import { Ticket } from '../model/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });
  req.logger.info('Fetching ticket succeeded');
  res.send(tickets);
});

export { router as indexTicketsRouter };
