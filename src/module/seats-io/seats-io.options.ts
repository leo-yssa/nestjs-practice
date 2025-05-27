import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeatsIOOptions {
  readonly workspaceKey: string;
  readonly holdPeriod: number;

  constructor(private configService: ConfigService) {
    this.workspaceKey = this.configService.get<string>('SEATSIO_WORKSPACE_KEY');
    this.holdPeriod = this.configService.get<number>('SEATSIO_HOLD_PERIOD');
  }
}
