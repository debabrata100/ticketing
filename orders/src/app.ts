import express from 'express';
import cookiesession from 'cookie-session';
import 'express-async-errors';
import {
  errorHandler,
  NotFoundError,
  currentUser,
  prometheusMetrics as promResponseTimeMiddleware,
} from '@deb-ticketing/common';

import { metricsRouter } from './routes/metrics';
import { useLogger } from './middlewares/use-logger';
import responseTime from 'response-time';

import { deleteOrdersRouter } from './routes/delete';
import { indexOrdersRouter } from './routes/index';
import { newOrdersRouter } from './routes/new';
import { showOrdersRouter } from './routes/show';

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

app.use(currentUser);

app.use(metricsRouter);
app.use(deleteOrdersRouter);
app.use(indexOrdersRouter);
app.use(newOrdersRouter);
app.use(showOrdersRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
