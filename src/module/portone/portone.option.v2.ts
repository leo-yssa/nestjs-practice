import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortoneOptionV2 {
  constructor(private readonly configService: ConfigService) {}
  get apiHost() {
    return this.configService.get<string>('PORTONE_V2_API_HOST');
  }
  get apiSecret() {
    return this.configService.get<string>('PORTONE_V2_API_SECRET');
  }
}
