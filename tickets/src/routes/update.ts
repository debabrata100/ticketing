import express, { Request, Response } from 'express';
import { Ticket } from '../model/ticket';
import { body } from 'express-validator';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@deb-ticketing/common';

const router = express.Router();

router.put(
  '/api/tickets/:id',
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
    const id = req.params.id;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new NotFoundError();
    }
    const currentUser = req.currentUser;
    if (ticket?.userId !== currentUser.id) {
      throw new NotAuthorizedError();
    }
    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    res.status(200).send(ticket);
  }
);

export { router as updateTicketsRouter };
