import { Logger } from '@nestjs/common';

export class EnvValidator {
  private static readonly logger = new Logger(EnvValidator.name);

  private static readonly requiredEnvVars = {
    // 서버 설정
    SERVER_PORT: 'number',
    SERVER_PREFIX: 'string',
    NODE_ENV: 'string',

    // 데이터베이스 설정
    DB_TYPE: 'string',
    DB_HOST: 'string',
    DB_PORT: 'number',
    DB_USERNAME: 'string',
    DB_PASSWORD: 'string',
    DB_DATABASE: 'string',

    // Redis 설정
    REDIS_HOST: 'string',
    REDIS_PORT: 'number',
    REDIS_PASSWORD: 'string',

    // JWT 설정
    JWT_SECRET: 'string',

    // AWS 설정
    AWS_REGION: 'string',
    AWS_ACCESS_KEY_ID: 'string',
    AWS_SECRET_ACCESS_KEY: 'string',

    // Firebase 설정
    FIREBASE_PROJECT_ID: 'string',
    FIREBASE_TYPE: 'string',
    FIREBASE_PRIVATE_KEY_ID: 'string',
    FIREBASE_PRIVATE_KEY: 'string',
    FIREBASE_CLIENT_EMAIL: 'string',
    FIREBASE_CLIENT_ID: 'string',
    FIREBASE_AUTH_URI: 'string',
    FIREBASE_TOKEN_URI: 'string',
    FIREBASE_AUTH_PROVIDER_CERT_URL: 'string',
    FIREBASE_CLIENT_CERT_URL: 'string',

    // SeatsIO 설정
    SEATSIO_WORKSPACE_KEY: 'string',
    SEATSIO_HOLD_PERIOD: 'number',
  } as const;

  static validate(): void {
    const missingVars: string[] = [];
    const invalidTypeVars: string[] = [];

    Object.entries(this.requiredEnvVars).forEach(([key, type]) => {
      const value = process.env[key];

      // 환경 변수가 없는 경우
      if (value === undefined) {
        missingVars.push(key);
        return;
      }

      // 타입 검증
      if (type === 'number') {
        const num = Number(value);
        if (isNaN(num)) {
          invalidTypeVars.push(`${key} (expected number, got ${typeof value})`);
        }
      }
    });

    // 에러 메시지 생성
    if (missingVars.length > 0 || invalidTypeVars.length > 0) {
      let errorMessage = '';

      if (missingVars.length > 0) {
        errorMessage += `Missing required environment variables:\n${missingVars.join('\n')}\n\n`;
      }

      if (invalidTypeVars.length > 0) {
        errorMessage += `Invalid type for environment variables:\n${invalidTypeVars.join('\n')}`;
      }

      this.logger.error(errorMessage);
      throw new Error('Environment validation failed');
    }

    this.logger.log('Environment variables validated successfully');
  }
}
