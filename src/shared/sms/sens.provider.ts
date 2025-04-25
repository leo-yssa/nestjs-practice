import { Injectable, Logger } from '@nestjs/common';
import { ISmsProvider } from './sms.interface';
import { SmsConfig, SmsOptions } from './sms.options';
import { SmsApiException } from './sms.exception';
import axios from 'axios';
import crypto from 'crypto';

@Injectable()
export class SensProvider implements ISmsProvider {
  private readonly options: SmsOptions;
  private readonly baseUrl = 'https://sens.apigw.ntruss.com';
  private readonly logger = new Logger(SensProvider.name);

  constructor(private readonly config: SmsConfig) {
    this.options = config.getOptions();
  }

  private getSignature(timestamp: string): string {
    const space = ' ';
    const newLine = '\n';
    const method = 'POST';
    const url = `/sms/v2/services/${this.options.serviceId}/messages`;

    const hmac = crypto.createHmac('sha256', this.options.secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.options.accessKey);

    return hmac.digest('base64');
  }

  async send(
    to: string,
    message: string,
    countryCode: string = '82',
  ): Promise<void> {
    this.logger.debug(`Sending SMS to ${to} with country code ${countryCode}`);
    const timestamp = Date.now().toString();
    const signature = this.getSignature(timestamp);

    try {
      const response = await axios.post(
        `${this.baseUrl}/sms/v2/services/${this.options.serviceId}/messages`,
        {
          type: 'SMS',
          contentType: 'COMM',
          countryCode,
          from: this.options.fromNumber,
          content: message,
          messages: [
            {
              to,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': this.options.accessKey,
            'x-ncp-apigw-signature-v2': signature,
          },
        },
      );

      if (response.status >= 400) {
        throw new SmsApiException('SMS API 응답 실패', response.data);
      }

      this.logger.debug('SMS sent successfully');
    } catch (error) {
      this.logger.error('Failed to send SMS', error);
      if (axios.isAxiosError(error)) {
        throw new SmsApiException(
          `SMS 전송 실패: ${error.response?.data?.message || error.message}`,
          error.response?.data,
        );
      }
      throw error;
    }
  }
}
