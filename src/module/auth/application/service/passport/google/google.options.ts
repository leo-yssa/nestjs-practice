import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StrategyOptions } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategyOptions {
  constructor(private readonly configService: ConfigService) {}

  getOptions(): StrategyOptions {
    return {
      clientID: this.configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: this.configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
    };
  }

  getAuthorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account',
    };
  }
}
