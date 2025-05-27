import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SmsConfig } from './sms.options';
import { SmsProvider } from './sms.provider';

@Module({
  imports: [ConfigModule],
  providers: [SmsConfig, SmsProvider],
  exports: [SmsConfig, SmsProvider],
})
export class SmsModule {}
