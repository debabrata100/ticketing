import express, { Request, Response } from 'express';
import { currentUser } from '@deb-ticketing/common';
import { requireAuth } from '@deb-ticketing/common';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
