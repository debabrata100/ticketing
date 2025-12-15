import { BaseLogger } from '@deb-ticketing/common';

const logger = new BaseLogger({
  serviceName: process.env.SERVICE_NAME || 'auth',
  LOKI_URL: process.env.LOKI_URL || 'http://loki-srv:3100',
});

export default logger;
