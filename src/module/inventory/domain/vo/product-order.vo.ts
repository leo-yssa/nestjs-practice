import { ProductOrderItemVO } from '@inventory/domain/vo/product-order-item.vo';
import { PaymentStatusType } from '@shared/type/inventory.type';

export class ProductOrderVO {
  constructor(
    public readonly id: string,
    public readonly quantity: number,
    public priceAtPurchase: number,
    public readonly paymentId: string,
    public readonly userId: string,
    public readonly items: ProductOrderItemVO[],
    public paymentStatus: PaymentStatusType,
    public paidAt: Date,
    public payMethod: string,
    public isOrderConfirmed: boolean,
    public isAdultConfirmed: boolean,
    public isRefundPolicyConfirmed: boolean,
    public isPrivacyPolicyConfirmed: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

export type GetProductOrderByIdInputVO = Pick<ProductOrderVO, 'id'>;
export type UpdateProductOrderStatusWithPaymentIdInputVO = Pick<ProductOrderVO, 'id' | 'paymentStatus' | 'paymentId'>;
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
