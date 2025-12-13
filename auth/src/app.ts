import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler, NotFoundError } from '@deb-ticketing/common';

import cookiesession from 'cookie-session';
import 'express-async-errors';
import { metricsRouter } from './routes/metrics';

const app = express();
app.set('trust-proxy', true);
app.use(express.json());
app.use(
  cookiesession({
    signed: false,
    secureProxy: process.env.NODE_ENV !== 'test',
  })
);

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
