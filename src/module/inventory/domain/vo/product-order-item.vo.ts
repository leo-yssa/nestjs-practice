import { ProductItemVO } from '@inventory/domain/vo/product-item.vo';
import { ProductOrderVO } from '@inventory/domain/vo/product-order.vo';
export class ProductOrderItemVO {
  constructor(
    public readonly id: string,
    public readonly order: ProductOrderVO,
    public readonly item: ProductItemVO,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

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
