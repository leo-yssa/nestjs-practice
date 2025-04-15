import { ApiProperty } from '@nestjs/swagger';
import { SmsAuthDto } from './sms-auth.dto';

export class CreateTokenDto extends SmsAuthDto {
  @ApiProperty({ description: 'Sms 요청 시에 받은 uuid' })
  id: string;
  @ApiProperty({ description: 'Sms에서 받은 6자리 인증번호' })
  securityCode: string;
}
