import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type MulterOptionsFactory,
  type MulterModuleOptions,
} from '@nestjs/platform-express';
import { AwsOptions } from '@shared/aws/aws.options';
import * as multerS3 from 'multer-s3';
@Injectable()
export class MulterOptions implements MulterOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly awsOptions: AwsOptions,
  ) {}

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    const multer = this.configService.get<string>('MULTER_TYPE');
    if (multer === 's3') {
      return {
        storage: multerS3({
          s3: new S3Client(this.awsOptions.createAwsConfig()),
          bucket: this.configService.get<string>('MULTER_S3_BUCKET'),
          acl: 'public-read',
          contentType: multerS3.AUTO_CONTENT_TYPE,
          key(req, file, callback) {
            callback(null, `${Date.now()}_${file.originalname}`);
          },
        }),
        // 파일 크기 제한
        limits: {
          fileSize: 10 * 1024 * 1024,
        },
      };
    }
  }
}
