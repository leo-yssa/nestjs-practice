import { LoggerService } from '@nestjs/common';

export interface ExtendedLoggerService extends LoggerService {
  setContext(context: string): void;
}
