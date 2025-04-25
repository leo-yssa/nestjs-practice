import { Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemQuery } from './get-item.query';
import { IItemRepository } from '@item/domain/repository/item.repository.interface';
import { ItemVO } from '@shared/vo/item.vo';

@Injectable()
@QueryHandler(GetItemQuery)
export class GetItemQueryHandler implements IQueryHandler<GetItemQuery> {
  constructor(
    @Inject('ItemRepository') private itemRepository: IItemRepository,
  ) {}

  async execute(query: GetItemQuery): Promise<ItemVO> {
    return await this.itemRepository.findById(query.id);
  }
}
