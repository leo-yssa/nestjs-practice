import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductOptionDto } from '@inventory/interface/dto/product-option.dto';

export class CheckoutDto {
  @ApiProperty({ type: [ProductOptionDto] })
  @Type(() => ProductOptionDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  productOptions: ProductOptionDto[];

  @ApiProperty({ type: String, description: '주문 ID' })
  orderId: string;

  @ApiProperty({ type: String, description: '결제 수단' })
  payMethod: string;

  @ApiProperty({ type: Number, description: '결제 금액' })
  priceAtPurchase: number;

  @ApiProperty({ type: Boolean, description: '주문내용 확인 및 결제 동의' })
  isOrderConfirmed: boolean;

  @ApiProperty({ type: Boolean, description: '만 19세 이상 결제 동의' })
  isAdultConfirmed: boolean;

  @ApiProperty({ type: Boolean, description: '환불 취소 정책 동의' })
  isRefundPolicyConfirmed: boolean;

  @ApiProperty({ type: Boolean, description: '개인정보 수집 및 결제 약관 동의' })
  isPrivacyPolicyConfirmed: boolean;
}

export type PreCheckoutRequestDto = Pick<CheckoutDto, 'productOptions'>;
export type CheckoutRequestDto = Pick<
  CheckoutDto,
  | 'productOptions'
  | 'orderId'
  | 'payMethod'
  | 'priceAtPurchase'
  | 'isOrderConfirmed'
  | 'isAdultConfirmed'
  | 'isRefundPolicyConfirmed'
  | 'isPrivacyPolicyConfirmed'
>;
