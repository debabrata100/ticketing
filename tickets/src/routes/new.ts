import { requireAuth, validateRequest } from '@deb-ticketing/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../model/ticket';

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
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
