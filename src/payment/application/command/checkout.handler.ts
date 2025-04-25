import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckoutCommand } from './checkout.command';
import { IPaymentRepository } from '@payment/domain/repository/payment.repository.interface';
import { OrderVO } from '@payment/domain/vo/order.vo';
import { plainToInstance } from 'class-transformer';
import { UserAdapter } from '@payment/infrastructure/adapter/user.adapter';
import { ItemProcessorFactory } from '../factory/item-processor.factory';

@Injectable()
@CommandHandler(CheckoutCommand)
export class CheckoutCommandHandler
  implements ICommandHandler<CheckoutCommand>
{
  private readonly logger = new Logger(CheckoutCommandHandler.name);
  constructor(
    private userAdapter: UserAdapter,
    private readonly itemProcessorFactory: ItemProcessorFactory,
    @Inject('PaymentRepository') private paymentRepository: IPaymentRepository,
  ) {}

  async execute(command: CheckoutCommand) {
    const { userId } = command;
    const user = await this.userAdapter.getUserById(userId);
    if (!user) {
      throw new BadRequestException('존재하지 않는 유저입니다.');
    }
    const cart = await this.paymentRepository.getCartByUserId(userId);

    if (!cart || cart.getItems.length === 0) {
      throw new BadRequestException('장바구니가 비어 있습니다.');
    }

    const order = this.paymentRepository.createOrder(
      plainToInstance(OrderVO, {
        user: user,
        items: [],
      }),
    );

    for (const cartItem of cart.getItems) {
      const processor = this.itemProcessorFactory.getProcessor(
        cartItem.getItem.getType,
      );
      await processor.validateCheckout(cartItem.getItem, cartItem);
      await processor.processCheckout(cartItem.getItem, cartItem, userId);

      const orderItem = this.paymentRepository.createOrderItem(
        order,
        cartItem.getItem,
        cartItem.getQuantity,
        processor.calculatePrice(cartItem.getItem, cartItem.getQuantity),
      );
      order.addItem(orderItem);
    }

    await this.paymentRepository.saveOrder(order);

    cart.clearItems();
    await this.paymentRepository.saveCart(cart);

    return order;
  }
}
