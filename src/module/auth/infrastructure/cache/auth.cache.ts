import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { IAuthCache } from '@auth/domain/cache/auth-cache.interface';
import Redis from 'ioredis';

@Injectable()
export class AuthCache implements IAuthCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async create(key: string, value: string, ttl: number): Promise<void> {
    await this.redis.set(`auth:${key}`, JSON.stringify(value), 'EX', ttl);
    return;
  }
  async get(key: string): Promise<string> {
    return this.redis.get(`auth:${key}`);
  }
}
