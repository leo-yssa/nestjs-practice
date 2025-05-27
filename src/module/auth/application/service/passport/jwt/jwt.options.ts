import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type JwtModuleOptions, type JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtOptions implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      global: true,
      secret: this.configService.get<string>('JWT_SECRET'),
      signOptions: {
        algorithm: 'HS256', // 해싱 알고리즘 (기본값: 'HS256')
        // issuer: 'your-app-name',    // 토큰 발급자
        // subject: user.id.toString(), // 토큰 주제 (주로 유저 ID)
        // audience: 'your-app-users', // 토큰 대상자
        // jwtid: uuid(),              // 고유 토큰 ID (중복 방지, 트래킹용)
        // notBefore: '0',             // 토큰 사용 가능 시점 (ex: '10s' → 10초 후부터 유효)
      },
    };
  }
}
