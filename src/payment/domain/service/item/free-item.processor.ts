import { Injectable } from '@nestjs/common';
import { IItemProcessor } from '@payment/domain/service/item/item-processor.interface';
import { ItemVO } from '@shared/vo/item.vo';
import { CartItemVO } from '@payment/domain/vo/cart-item.vo';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class FreeItemProcessor implements IItemProcessor {
  async validateAddToCart(item: ItemVO, quantity: number): Promise<void> {
    if (quantity > 1) {
      throw new BadRequestException('무상 제공 상품은 1개만 담을 수 있습니다.');
    }
  }

  async validateCheckout(item: ItemVO, cartItem: CartItemVO): Promise<void> {
    if (cartItem.getQuantity > 1) {
      throw new BadRequestException(
        '무상 제공 상품은 1개만 구매할 수 있습니다.',
      );
    }
  }

  async processCheckout(): Promise<void> {
    // 무상 제공 상품은 추가 처리 필요 없음
  }

  calculatePrice(): number {
    return 0;
  }
}
