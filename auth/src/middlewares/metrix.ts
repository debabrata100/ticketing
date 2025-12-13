import client from 'prom-client';
import { Request, Response } from 'express';

const reqResponseTimeHistogram = new client.Histogram({
  name: 'http_sm_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [1, 50, 100, 200, 300, 400, 500, 750, 1000, 2000, 5000],
});

const totalRequestsCounter = new client.Counter({
  name: 'http_sm_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

export function metricsMiddleware(req: Request, res: Response, time: number) {
  if (!req.path.includes('/metrics')) {
    totalRequestsCounter.inc();
  }
  if (req.route && res.statusCode) {
    reqResponseTimeHistogram
      .labels(req.method, req.route.path, res.statusCode.toString())
      .observe(time / 1000);
  }
}
