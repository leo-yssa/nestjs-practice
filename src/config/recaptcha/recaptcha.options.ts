import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecaptchaOptions {
  readonly projectId: string;
  readonly apiKey: string;
  readonly apiUrl: string;
  readonly botIndex: number;
  readonly expectedAction: string;
  readonly androidPackageNames: string[];
  readonly iosBundleIds: string[];
  readonly hostNames: string[];

  constructor(private configService: ConfigService) {
    this.projectId = this.configService.get<string>('RECAPTCHA_PROJECT_ID');
    this.apiKey = this.configService.get<string>('RECAPTCHA_API_KEY');
    this.apiUrl = this.configService.get<string>('RECAPTCHA_API_URL') || 'https://recaptchaenterprise.googleapis.com';
    this.botIndex = this.configService.get<number>('RECAPTCHA_BOT_INDEX');
    this.expectedAction = this.configService.get<string>('RECAPTCHA_EXPECTED_ACTION');
    this.androidPackageNames = this.configService.get<string>('RECAPTCHA_ANDROID_PACKAGE_NAMES')?.split(',');
    this.iosBundleIds = this.configService.get<string>('RECAPTCHA_IOS_BUNDLE_IDS')?.split(',');
    this.hostNames = this.configService.get<string>('RECAPTCHA_HOST_NAMES')?.split(',');
  }
}
