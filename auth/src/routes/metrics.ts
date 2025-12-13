import express, { Request, Response } from 'express';
import client from 'prom-client';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register: client.register });

const router = express.Router();

router.get('/api/users/metrics', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

export { router as metricsRouter };
