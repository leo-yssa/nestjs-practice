import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { IInventoryCache } from '@inventory/domain/cache/inventory-cache.interface';

@Injectable()
export class InventoryCache implements IInventoryCache {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  async savePortoneAccessToken(accessToken: string, ttl: number): Promise<void> {
    await this.redis.set(`inventory:portone_access_token`, accessToken, 'EX', ttl);
    return;
  }
  async getPortoneAccessToken(): Promise<string> {
    return this.redis.get(`inventory:portone_access_token`);
  }
}
