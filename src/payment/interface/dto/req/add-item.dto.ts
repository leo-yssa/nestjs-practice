import { IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCartItemRequestDto {
  @ApiProperty({ description: '상품 ID', example: 'item-abc123' })
  @IsString()
  itemId: string;

  @ApiProperty({ description: '상품 수량', example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;
}
