import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { MailerOptions } from './mailer.options';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      useClass: MailerOptions,
    }),
  ],
})
export class MailerModule {}
