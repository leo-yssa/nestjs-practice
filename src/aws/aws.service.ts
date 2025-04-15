// aws.service.ts
import { Injectable } from '@nestjs/common';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsService {
  private region: string;
  private s3: S3Client;
  private sns: SNSClient;

  constructor(readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION');
    this.s3 = new S3Client({ region: this.region });
    this.sns = new SNSClient({ region: this.region });
  }
  async uploadToS3(bucket: string, key: string, body: Buffer) {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
    });
    await this.s3.send(command);
  }

  async sendSms(phoneNumber: string, message: string) {
    const command = new PublishCommand({
      PhoneNumber: phoneNumber, // E.164 포맷 필수 (예: +821012345678)
      Message: message,
    });

    try {
      const response = await this.sns.send(command);
      console.log('SMS sent:', response);
      return response;
    } catch (error) {
      console.error('SMS send error:', error);
      throw error;
    }
  }
}
