import { BaseLogger, LoggerConfig } from '@deb-ticketing/common';
const serviceName = process.env.SERVICE_NAME || 'unknown-service';
class AuthLogger extends BaseLogger<LoggerConfig> {
  readonly serviceName = serviceName;
  readonly LOKI_URL = process.env.LOKI_URL || '';
  readonly interval = 5;
  readonly level = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
}

const logger = new AuthLogger();

export default logger;
