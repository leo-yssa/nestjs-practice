import { Module } from '@nestjs/common';
import { MailerModule as NestMailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { AwsOptions } from '@config/aws/aws.options';
import { MailerOptions } from './mailer.options';

@Module({
  imports: [
    ConfigModule,
    NestMailerModule.forRootAsync({
      useClass: MailerOptions,
    }),
  ],
  providers: [AwsOptions, MailerOptions],
  exports: [AwsOptions, MailerOptions],
})
export class MailerModule {}
