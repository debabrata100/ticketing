import express from 'express';
import cookiesession from 'cookie-session';
import responseTime from 'response-time';

import 'express-async-errors';
import {
  errorHandler,
  NotFoundError,
  currentUser,
  prometheusMetrics as promResponseTimeMiddleware,
} from '@deb-ticketing/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketsRouter } from './routes';
import { updateTicketsRouter } from './routes/update';
import { metricsRouter } from './routes/metrics';
import { useLogger } from './middlewares/use-logger';

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

app.use(metricsRouter);
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketsRouter);
app.use(updateTicketsRouter);

app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);
export { app };
