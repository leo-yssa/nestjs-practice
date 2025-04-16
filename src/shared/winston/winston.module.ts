import { Module } from '@nestjs/common';
import { WinstonModule as NestWinstonModule } from 'nest-winston';
import { WinstonOptions } from './winston.options';

@Module({
  imports: [
    NestWinstonModule.forRootAsync({
      useClass: WinstonOptions,
    }),
  ],
  exports: [NestWinstonModule],
})
export class WinstonModule {}
