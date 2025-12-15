import { createLogger } from 'winston';
import LokiTransport from 'winston-loki';
import winston from 'winston';
const options = {
  transports: [
    new LokiTransport({
      host: process.env.LOKI_URL || 'http://loki-srv:3100',
      json: true,
      labels: { app: 'server-monitoring-service' },
      format: winston.format.json(),
    }),
  ],
};

const logger = createLogger(options);

export default logger;
