import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PortoneDto {
  @ApiProperty({ description: '포트원 결제 번호' })
  @IsString()
  impUid: string;

  @ApiProperty({ description: '고객사 채번 고유 주문 번호' })
  @IsString()
  merchantUid: string;

  @ApiProperty({ description: '결제 상태' })
  @IsString()
  status: string;

  @ApiProperty({ description: '취소내역 아이디' })
  @IsOptional()
  @IsString()
  cancellationId?: string;
}

export class WebhookRequestDto extends PickType(PortoneDto, ['impUid', 'merchantUid', 'status', 'cancellationId']) {}

export class CallbackRequestDto extends PickType(PortoneDto, ['impUid', 'merchantUid']) {}
export class ConfirmRequestDto extends PickType(PortoneDto, ['impUid', 'merchantUid']) {}
