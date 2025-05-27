import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface SmsOptions {
  accessKey: string;
  secretKey: string;
  serviceId: string;
  fromNumber: string;
}

@Injectable()
export class SmsConfig {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): SmsOptions {
    return {
      accessKey: this.configService.get<string>('NCLOUD_ACCESS_KEY'),
      secretKey: this.configService.get<string>('NCLOUD_SECRET_KEY'),
      serviceId: this.configService.get<string>('NCLOUD_SENS_SERVICE_ID'),
      fromNumber: this.configService.get<string>('NCLOUD_SENS_FROM_NUMBER'),
    };
  }
}
