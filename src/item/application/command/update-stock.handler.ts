import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateStockCommand } from './update-stock.command';
import { IItemRepository } from '@item/domain/repository/item.repository.interface';

@Injectable()
@CommandHandler(UpdateStockCommand)
export class UpdateStockCommandHandler
  implements ICommandHandler<UpdateStockCommand>
{
  private readonly logger = new Logger(UpdateStockCommandHandler.name);

  constructor(
    @Inject('ItemRepository')
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(command: UpdateStockCommand): Promise<void> {
    const { itemId, stock } = command;

    // 상품 존재 여부 확인
    const item = await this.itemRepository.findById(itemId);
    if (!item) {
      throw new NotFoundException('상품을 찾을 수 없습니다.');
    }

    try {
      await this.itemRepository.updateStock(itemId, stock);
      this.logger.log(`Updated stock for item ${itemId} to ${stock}`);
    } catch (error) {
      this.logger.error(`Failed to update stock for item ${itemId}:`, error);
      throw new BadRequestException('재고 수정에 실패했습니다.');
    }
  }
}
