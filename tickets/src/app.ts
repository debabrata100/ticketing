import express from 'express';
import cookiesession from 'cookie-session';
import 'express-async-errors';
import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@deb-ticketing/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketsRouter } from './routes';
import { updateTicketsRouter } from './routes/update';

const app = express();
app.set('trust-proxy', true);
app.use(express.json());
app.use(
  cookiesession({
    signed: false,
    secureProxy: process.env.NODE_ENV !== 'test',
  })
);
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
