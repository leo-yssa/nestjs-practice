import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeatsIOOptions } from './seats-io.options';
import { SeatsIOService } from './seats-io.service';
@Module({
  imports: [ConfigModule],
  providers: [SeatsIOService, SeatsIOOptions],
  exports: [SeatsIOService],
})
export class SeatsIOModule {}
