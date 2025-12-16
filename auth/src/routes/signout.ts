import express, { Request, Response } from 'express';
import logger from '../logger/logger';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
  req.session = null;
  logger.info(`Logout succeed`, { requestId: req.requestId });
  res.send({});
});

export { router as signoutRouter };
