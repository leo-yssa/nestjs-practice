import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IBatch } from './batch.interface';

@Injectable()
export class CleanExpiredCartBatch implements IBatch {
  private readonly logger = new Logger(CleanExpiredCartBatch.name);

  constructor() {}

  @Cron(CronExpression.EVERY_HOUR)
  async execute(): Promise<void> {
    this.logger.log('Starting clean expired cart batch job');
  }
}
