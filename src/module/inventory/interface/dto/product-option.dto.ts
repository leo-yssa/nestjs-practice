import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductOptionDto {
  @ApiProperty({ description: '상품 옵션 ID', example: 'item-abc123' })
  @IsString()
  id: string;

  @ApiProperty({ description: '상품 옵션 수량', example: 1 })
  @IsNumber()
  quantity: number;
}
