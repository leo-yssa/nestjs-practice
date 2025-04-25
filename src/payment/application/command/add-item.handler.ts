import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddItemCommand } from './add-item.command';
import { IPaymentRepository } from '@payment/domain/repository/payment.repository.interface';
import { CartVO } from '@payment/domain/vo/cart.vo';
import { ItemAdapter } from '@payment/infrastructure/adapter/item.adapter';
import { ItemProcessorFactory } from '../factory/item-processor.factory';

@Injectable()
@CommandHandler(AddItemCommand)
export class AddItemCommandHandler implements ICommandHandler<AddItemCommand> {
  private readonly logger = new Logger(AddItemCommandHandler.name);
  constructor(
    @Inject('ItemPort') private itemAdapter: ItemAdapter,
    private readonly itemProcessorFactory: ItemProcessorFactory,
    @Inject('PaymentRepository')
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async execute(command: AddItemCommand): Promise<CartVO> {
    const { userId, itemId, quantity } = command;
    const item = await this.itemAdapter.getItemById(itemId);
    if (!item || item.getStock < quantity) {
      throw new BadRequestException('재고가 부족합니다.');
    }
    const processor = this.itemProcessorFactory.getProcessor(item.getType);
    await processor.validateAddToCart(item, quantity);

    const cart = await this.paymentRepository.getCartByUserId(userId);

    const existing = cart.getItems.find((ci) => ci.getId === itemId);
    if (existing) {
      existing.increaseQuantity(quantity);
    } else {
      const newItem = this.paymentRepository.createCartItem(
        cart,
        item,
        quantity,
      );
      cart.addItem(newItem);
    }

    await this.paymentRepository.saveCart(cart);
    return cart;
  }
}
