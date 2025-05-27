import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule as NestWinstonModule, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { WinstonService } from './winston/winston.service';
import { WinstonOptions } from './winston/winston.options';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  imports: [
    NestWinstonModule.forRootAsync({
      useClass: WinstonOptions,
    }),
  ],
  providers: [
    {
      provide: WINSTON_MODULE_NEST_PROVIDER,
      useClass: WinstonService,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  exports: [],
})
export class LoggerModule {}
