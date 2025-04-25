import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { IPaymentRepository } from '@payment/domain/repository/payment.repository.interface';
import { CartEntity } from '../entity/cart.entity';
import { CartItemEntity } from '../entity/cart-item.entity';
import { OrderEntity } from '../entity/order.entity';
import { OrderItemEntity } from '../entity/order-item.entity';
import { ItemEntity } from '@item/infrastructure/database/entity/item.entity';
import { CartVO } from '@payment/domain/vo/cart.vo';
import { CartItemVO } from '@payment/domain/vo/cart-item.vo';
import { OrderVO } from '@payment/domain/vo/order.vo';
import { ItemVO } from '@shared/vo/item.vo';
import { OrderItemVO } from '@payment/domain/vo/order-item.vo';
@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemRepository: Repository<OrderItemEntity>,
  ) {}

  async getCartByUserId(userId: string): Promise<CartVO> {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.item'],
    });
    return plainToInstance(CartVO, cart);
  }
  createCartItem(cart: CartVO, item: ItemVO, quantity: number): CartItemVO {
    return plainToInstance(
      CartItemVO,
      this.cartItemRepository.create({
        cart: plainToInstance(CartEntity, cart),
        item: plainToInstance(ItemEntity, item),
        quantity,
      }),
    );
  }
  async saveCart(cart: CartVO): Promise<CartVO> {
    const savedCart = await this.cartRepository.save(
      plainToInstance(CartEntity, cart),
    );
    return plainToInstance(CartVO, savedCart);
  }
  createOrder(order: OrderVO): OrderVO {
    order.generateId();
    return plainToInstance(
      OrderVO,
      this.orderRepository.create(plainToInstance(OrderEntity, order)),
    );
  }
  createOrderItem(
    order: OrderVO,
    item: ItemVO,
    quantity: number,
    priceAtPurchase: number,
  ): OrderItemVO {
    return plainToInstance(
      OrderItemVO,
      this.orderItemRepository.create(
        plainToInstance(OrderItemEntity, {
          order: plainToInstance(OrderEntity, order),
          item: plainToInstance(ItemEntity, item),
          quantity,
          priceAtPurchase: priceAtPurchase,
        }),
      ),
    );
  }
  async saveOrder(order: OrderVO): Promise<OrderVO> {
    const savedOrder = await this.orderRepository.save(
      plainToInstance(OrderEntity, order),
    );
    return plainToInstance(OrderVO, savedOrder);
  }
}
