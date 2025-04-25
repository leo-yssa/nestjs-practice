import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RecaptchaOptions } from './recaptcha.options';
import {
  RecaptchaFailedException,
  NotSupportedDeviceException,
} from './recaptcha.exception';

@Injectable()
export class RecaptchaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly options: RecaptchaOptions,
  ) {}

  async verifyRecaptcha(
    token: string,
    siteKey: string,
    ipAddress: string,
  ): Promise<void> {
    if (!token || !siteKey) {
      throw new RecaptchaFailedException();
    }

    const apiPath = `/v1/projects/${this.options.projectId}/assessments?key=${this.options.apiKey}`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.options.apiUrl}${apiPath}`, {
          event: {
            token,
            siteKey,
            expectedAction: this.options.expectedAction,
            userIpAddress: ipAddress,
          },
        }),
      );

      const resp = response.data;

      if (!resp.tokenProperties) {
        throw new RecaptchaFailedException();
      }

      if (resp.tokenProperties.action !== 'kkr_recaptcha') {
        throw new RecaptchaFailedException();
      }

      // Check if the device is supported
      const isSupportedDevice =
        this.options.androidPackageNames.includes(
          resp.tokenProperties.androidPackageName,
        ) ||
        this.options.iosBundleIds.includes(resp.tokenProperties.iosBundleId) ||
        this.options.hostNames.includes(resp.tokenProperties.hostname);

      if (!isSupportedDevice) {
        throw new NotSupportedDeviceException();
      }

      // Check bot score
      if (resp.riskAnalysis?.score <= this.options.botIndex) {
        throw new RecaptchaFailedException();
      }
    } catch (error) {
      if (
        error instanceof RecaptchaFailedException ||
        error instanceof NotSupportedDeviceException
      ) {
        throw error;
      }
      throw new RecaptchaFailedException();
    }
  }
}
