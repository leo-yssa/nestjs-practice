import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthOptions } from '@auth/auth.options';
import { GoogleStrategyOptions } from '@auth/application/service/passport/google/google.options';
import { GoogleStrategy } from '@auth/application/service/passport/google/google.strategy';
import { JwtOptions } from '@auth/application/service/passport/jwt/jwt.options';
import { JwtStrategy } from '@auth/application/service/passport/jwt/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.registerAsync({
      useClass: AuthOptions,
    }),
    JwtModule.registerAsync({
      useClass: JwtOptions,
      global: true,
    }),
  ],
  providers: [JwtStrategy, GoogleStrategy, GoogleStrategyOptions],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
