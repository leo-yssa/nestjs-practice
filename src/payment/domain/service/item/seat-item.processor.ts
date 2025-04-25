import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { IItemProcessor } from './item-processor.interface';
import { ItemVO } from '@shared/vo/item.vo';
import { CartItemVO } from '@payment/domain/vo/cart-item.vo';
import { SeatsIOAdapter } from '@payment/infrastructure/adapter/seats-io.adapter';

@Injectable()
export class SeatItemProcessor implements IItemProcessor {
  constructor(
    @Inject('SeatsIOAdapter')
    private readonly seatsIOAdapter: SeatsIOAdapter,
  ) {}

  async validateAddToCart(
    item: ItemVO,
    quantity: number,
    selectedSeats?: string[],
  ): Promise<void> {
    if (!selectedSeats || selectedSeats.length !== quantity) {
      throw new BadRequestException('좌석을 선택해주세요.');
    }
    await this.seatsIOAdapter.holdSeats(item.getEventId, selectedSeats);
  }

  async validateCheckout(item: ItemVO, cartItem: CartItemVO): Promise<void> {
    if (
      !cartItem.getSelectedSeats ||
      cartItem.getSelectedSeats.length !== cartItem.getQuantity
    ) {
      throw new BadRequestException('좌석 정보가 올바르지 않습니다.');
    }
  }

  async processCheckout(
    item: ItemVO,
    cartItem: CartItemVO,
    userId: string,
  ): Promise<void> {
    await this.seatsIOAdapter.bookSeats(
      item.getEventId,
      cartItem.getSelectedSeats,
      userId,
    );
  }

  calculatePrice(item: ItemVO, quantity: number): number {
    return item.getPrice * quantity;
  }
}
