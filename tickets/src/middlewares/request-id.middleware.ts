import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const incomingRequestId = req.header('x-request-id');

  const requestId = incomingRequestId ?? uuidv4();

  // attach to request object
  (req as any).requestId = requestId;

  // return it in response headers
  res.setHeader('x-request-id', requestId);

  next();
};
