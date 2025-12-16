import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import {
  errorHandler,
  NotFoundError,
  prometheusMetrics as promResponseTimeMiddleware,
} from '@deb-ticketing/common';

import cookiesession from 'cookie-session';
import 'express-async-errors';
import { metricsRouter } from './routes/metrics';
import responseTime from 'response-time';
import { useLogger } from './middlewares/use-logger';
import { requestIdMiddleware } from './middlewares/request-id.middleware';

const app = express();
app.set('trust-proxy', true);
app.use(express.json());
app.use(
  cookiesession({
    signed: false,
    secureProxy: process.env.NODE_ENV !== 'test',
  })
);

app.use(responseTime(promResponseTimeMiddleware));
app.use(useLogger);

// requestIdMiddleware should be used befor all routes to ensure every request has an ID
app.use(requestIdMiddleware);

app.use(metricsRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
