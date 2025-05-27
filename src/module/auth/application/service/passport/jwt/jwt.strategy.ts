import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto } from '@shared/dto/payload.dto';
import { USER_TYPE, UserType } from '@shared/type/user.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: PayloadDto) {
    const { userId, userType, tokenType } = payload;

    // Validate user type
    if (!Object.values(USER_TYPE).includes(userType as UserType)) {
      throw new UnauthorizedException('Invalid user type');
    }

    return {
      userId,
      userType,
      tokenType,
    };
  }
}
