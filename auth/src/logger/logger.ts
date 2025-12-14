import winston from 'winston';
import LokiTransport from 'winston-loki';

const serviceName = process.env.SERVICE_NAME || 'unknown-service';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {
    service: serviceName,
    env: process.env.NODE_ENV || 'development',
  },
  transports: [
    new winston.transports.Console(),

    new LokiTransport({
      host: process.env.LOKI_URL || 'http://loki-srv:3100',
      labels: {
        app: serviceName,
      },
      json: true,
      replaceTimestamp: true,
      batching: true,
      interval: 5, // seconds
    }),
  ],
});

export default logger;
