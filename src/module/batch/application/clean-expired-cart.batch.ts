import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IBatch } from '@batch/domain/service/batch.interface';
import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CleanExpiredOrderBatch implements IBatch {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
  ) {
    this.logger.setContext(CleanExpiredOrderBatch.name);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async execute(): Promise<void> {
    this.logger.log('Starting clean expired order batch job');
  }
}
