import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { IItemProcessor } from '@payment/domain/service/item/item-processor.interface';
import { ItemVO } from '@shared/vo/item.vo';
import { CartItemVO } from '@payment/domain/vo/cart-item.vo';
import { IItemPort } from '@payment/domain/port/item.port';

@Injectable()
export class NormalItemProcessor implements IItemProcessor {
  constructor(
    @Inject('ItemPort')
    private readonly itemPort: IItemPort,
  ) {}

  async validateAddToCart(item: ItemVO, quantity: number): Promise<void> {
    if (item.getStock < quantity) {
      throw new BadRequestException('재고가 부족합니다.');
    }
  }

  async validateCheckout(item: ItemVO, cartItem: CartItemVO): Promise<void> {
    if (item.getStock < cartItem.getQuantity) {
      throw new BadRequestException(
        `상품 ${item.getName}의 재고가 부족합니다.`,
      );
    }
  }

  async processCheckout(item: ItemVO, cartItem: CartItemVO): Promise<void> {
    item.decreaseStock(cartItem.getQuantity);
    await this.itemPort.updateStock(item.getId, item.getStock);
  }

  calculatePrice(item: ItemVO, quantity: number): number {
    return item.getPrice * quantity;
  }
}
