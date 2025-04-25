import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsConfig } from './sms.options';
import { SensProvider } from './sens.provider';

@Module({
  imports: [ConfigModule],
  providers: [SmsConfig, SensProvider],
})
export class SmsModule {}
