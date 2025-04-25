import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type MailerOptionsFactory,
  type MailerOptions as NestMailerOptions,
} from '@nestjs-modules/mailer';
import { SESClient, SendRawEmailCommand } from '@aws-sdk/client-ses';
import { AwsOptions } from '@shared/aws/aws.options';
@Injectable()
export class MailerOptions implements MailerOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly awsOptions: AwsOptions,
  ) {}

  createMailerOptions(): NestMailerOptions | Promise<NestMailerOptions> {
    const mailer = this.configService.get<string>('MAILER_TYPE');
    if (mailer === 'ses') {
      return {
        transport: {
          SES: {
            ses: new SESClient(this.awsOptions.createAwsConfig()),
            aws: { SendRawEmailCommand },
          },
        },
        defaults: {
          from: this.configService.get<string>('MAILER_FROM'),
        },
      };
    }
  }
}
