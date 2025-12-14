import express, { Request, Response } from 'express';
import { currentUser } from '@deb-ticketing/common';
import { requireAuth } from '@deb-ticketing/common';
import logger from '../logger/logger';

const router = express.Router();

const delay = async (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

router.get(
  '/api/users/currentuser',
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    logger.info(`current user delayed 3000ms ${req.path}`);
    await delay(3000);
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
