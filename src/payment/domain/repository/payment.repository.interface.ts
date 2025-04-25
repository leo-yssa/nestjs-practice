import { CartVO } from '@payment/domain/vo/cart.vo';
import { ItemVO } from '@shared/vo/item.vo';
import { CartItemVO } from '../vo/cart-item.vo';
import { OrderVO } from '../vo/order.vo';
import { OrderItemVO } from '../vo/order-item.vo';
export interface IPaymentRepository {
  getCartByUserId(userId: string): Promise<CartVO>;
  createCartItem(cart: CartVO, item: ItemVO, quantity: number): CartItemVO;
  createOrder(order: OrderVO): OrderVO;
  createOrderItem(
    order: OrderVO,
    item: ItemVO,
    quantity: number,
    priceAtPurchase: number,
  ): OrderItemVO;
  saveCart(cart: CartVO): Promise<CartVO>;
  saveOrder(order: OrderVO): Promise<OrderVO>;
}
