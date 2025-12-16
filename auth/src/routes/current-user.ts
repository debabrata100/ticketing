import express, { Request, Response } from 'express';
import { currentUser } from '@deb-ticketing/common';
import { requireAuth } from '@deb-ticketing/common';
import logger from '../logger/logger';

const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    logger.info(`current user fetched`, {
      userId: req.currentUser?.id,
      requestId: req.requestId,
    });
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
