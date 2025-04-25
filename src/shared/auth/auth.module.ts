import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptions } from './strategy/jwt/jwt.options';
import { PassportModule } from '@nestjs/passport';
import { AuthOptions } from './auth.options';
import { JwtStrategy } from './strategy/jwt/jwt.strategy';
import { GoogleStrategy } from './strategy/google/google.strategy';

@Module({
  imports: [
    PassportModule.registerAsync({
      useClass: AuthOptions,
    }),
    JwtModule.registerAsync({
      useClass: JwtOptions,
      global: true,
    }),
  ],
  providers: [JwtStrategy, GoogleStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
