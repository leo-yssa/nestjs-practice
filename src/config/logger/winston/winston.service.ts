import { Injectable } from '@nestjs/common';
import { createLogger, Logger } from 'winston';
import { WinstonOptions } from './winston.options';
import { ExtendedLoggerService } from '../extended-logger.service';
@Injectable()
export class WinstonService implements ExtendedLoggerService {
  private logger: Logger;
  private context: string;
  constructor() {
    this.logger = createLogger(WinstonOptions.getWinstonOptions());
  }

  setContext(context: string) {
    this.context = context;
  }

  log(message: any, context?: string): void {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: any, trace?: string, context?: string): void {
    this.logger.error(message, { trace, context: context || this.context });
  }

  warn(message: any, context?: string): void {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: any, context?: string): void {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: any, context?: string): void {
    this.logger.verbose(message, { context: context || this.context });
  }
}
