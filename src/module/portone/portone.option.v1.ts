import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortoneOptionV1 {
  constructor(private readonly configService: ConfigService) {}
  get host() {
    return this.configService.get<string>('PORTONE_V1_API_HOST');
  }
  get accessKey() {
    return this.configService.get<string>('PORTONE_V1_API_KEY');
  }
  get secretKey() {
    return this.configService.get<string>('PORTONE_V1_API_SECRET');
  }
}
