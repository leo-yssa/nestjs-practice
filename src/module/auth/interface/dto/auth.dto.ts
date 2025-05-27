import { ApiProperty, PickType } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: 'SMS 요청 시에 받은 uuid' })
  id: string;
  @ApiProperty({ description: 'SMS에서 받은 6자리 인증번호' })
  securityCode: string;
  @ApiProperty({ description: '국가 코드' })
  callingCode: string;
  @ApiProperty({ description: '휴대폰 번호' })
  phoneNumber: string;
  @ApiProperty({ description: 'access token' })
  accessToken: string;
  @ApiProperty({ description: 'refresh token' })
  refreshToken: string;
  @ApiProperty({ description: '생체인증 등록 시에 받은 public key' })
  publicKey: string;
  @ApiProperty({ description: '생체인증 인증 시에 받은 signature' })
  signature: string;
  @ApiProperty({ description: '생체인증 인증 시에 받은 message' })
  message: string;
}

export class SmsAuthDto extends PickType(AuthDto, ['callingCode', 'phoneNumber']) {}

export class AuthIdDto extends PickType(AuthDto, ['id']) {}

export class LoginWithSmsDto extends PickType(AuthDto, ['id', 'securityCode', 'callingCode', 'phoneNumber']) {}

export class TokenPairDto extends PickType(AuthDto, ['accessToken', 'refreshToken']) {}

export class BioRegisterDto extends PickType(AuthDto, ['publicKey']) {}

export class BioAuthDto extends PickType(AuthDto, ['id', 'signature', 'message']) {}
