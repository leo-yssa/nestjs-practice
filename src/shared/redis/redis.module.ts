import { Module } from '@nestjs/common';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { RedisOptions } from './redis.options';

@Module({
  imports: [
    NestRedisModule.forRootAsync({
      useClass: RedisOptions,
    }),
  ],
  exports: [NestRedisModule],
})
export class RedisModule {}
