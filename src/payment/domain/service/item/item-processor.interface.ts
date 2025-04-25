import { CartItemVO } from '@payment/domain/vo/cart-item.vo';
import { ItemVO } from '@shared/vo/item.vo';

export interface IItemProcessor {
  validateAddToCart(
    item: ItemVO,
    quantity: number,
    selectedSeats?: string[],
  ): Promise<void>;
  validateCheckout(item: ItemVO, cartItem: CartItemVO): Promise<void>;
  processCheckout(
    item: ItemVO,
    cartItem: CartItemVO,
    userId: string,
  ): Promise<void>;
  calculatePrice(item: ItemVO, quantity: number): number;
}
