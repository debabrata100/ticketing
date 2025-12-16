import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

declare global {
  namespace Express {
    interface Request {
      logger: {
        info(msg: string): void;
        warn(msg: string): void;
        error(msg: string): void;
        debug(msg: string): void;
      };
    }
  }
}

export function useLogger(req: Request, res: Response, next: NextFunction) {
  req.logger = logger;
  next();
}
