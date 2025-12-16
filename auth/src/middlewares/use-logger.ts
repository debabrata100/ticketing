import { Request, Response, NextFunction } from 'express';
import logger from '../logger/logger';

declare global {
  namespace Express {
    interface Request {
      logger: {
        info(msg: string, meta?: any): void;
        warn(msg: string, meta?: any): void;
        error(msg: string, meta?: any): void;
        debug(msg: string, meta?: any): void;
      };
    }
  }
}

export function useLogger(req: Request, res: Response, next: NextFunction) {
  req.logger = logger;
  next();
}
