import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateStockCommand } from '@item/application/command/update-stock.command';
import { IItemPort } from '@payment/domain/port/item.port';
import { GetItemQuery } from '@item/application/query/get-item.query';
import { ItemVO } from '@shared/vo/item.vo';

@Injectable()
export class ItemAdapter implements IItemPort {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async updateStock(itemId: string, stock: number): Promise<void> {
    return this.commandBus.execute(new UpdateStockCommand(itemId, stock));
  }

  async getItemById(id: string): Promise<ItemVO> {
    return this.queryBus.execute(new GetItemQuery(id));
  }
}
