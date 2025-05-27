import { ProductOptionVO } from '@inventory/domain/vo/product-option.vo';

export class CheckoutVO {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly productOptions: ProductOptionVO[],
    public readonly payMethod: string,
    public readonly priceAtPurchase: number,
    public readonly isOrderConfirmed: boolean,
    public readonly isAdultConfirmed: boolean,
    public readonly isRefundPolicyConfirmed: boolean,
    public readonly isPrivacyPolicyConfirmed: boolean,
  ) {}
}

export type PreCheckoutInputVO = Pick<CheckoutVO, 'userId' | 'productOptions'>;
export type CheckoutInputVO = Pick<
  CheckoutVO,
  | 'orderId'
  | 'userId'
  | 'productOptions'
  | 'payMethod'
  | 'priceAtPurchase'
  | 'isOrderConfirmed'
  | 'isAdultConfirmed'
  | 'isRefundPolicyConfirmed'
  | 'isPrivacyPolicyConfirmed'
>;

// @ApiProperty({ description: 'mid' })
//   pg: string;

//   @ApiProperty({ description: '결제 방식', enum: PAY_METHOD })
//   pay_method: PayMethod;

//   @ApiProperty({ description: '고객사 고유주문번호' })
//   merchant_uid: string;

//   @ApiProperty({ description: '결제 상품명' })
//   name: string;

//   @ApiProperty({ description: '결제 통화', enum: CURRENCY_TYPE })
//   currency: CurrencyType;

//   @ApiProperty({ description: '결제 금액' })
//   amount: number;

//   @ApiProperty({ description: 'confirm url' })
//   confirm_url: string;

//   @ApiProperty({ description: 'notice url' })
//   notice_url: string;
