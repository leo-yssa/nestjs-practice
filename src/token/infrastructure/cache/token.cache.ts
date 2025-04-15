import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ITokenCache } from 'src/token/domain/cache/token.cache.interface';

@Injectable()
export class TokenCache implements ITokenCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async create(key, value, ttl): Promise<void> {
    await this.redis.set(`auth:${key}`, JSON.stringify(value), 'EX', ttl);
    return;
  }
  async get(key): Promise<string> {
    return this.redis.get(`auth:${key}`);
  }
}
