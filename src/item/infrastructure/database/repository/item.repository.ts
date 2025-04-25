import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { IItemRepository } from '@item/domain/repository/item.repository.interface';
import { ItemVO } from '@shared/vo/item.vo';
import { ItemEntity } from '../entity/item.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ItemRepository implements IItemRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async createItem(item: ItemVO): Promise<ItemVO> {
    const entity = plainToInstance(ItemEntity, item);
    const savedEntity = await this.itemRepository.save(entity);
    return plainToInstance(ItemVO, savedEntity);
  }

  async findById(id: string): Promise<ItemVO> {
    const entity = await this.itemRepository.findOne({ where: { id } });
    return entity ? plainToInstance(ItemVO, entity) : null;
  }

  async updateItem(item: ItemVO): Promise<ItemVO> {
    const entity = plainToInstance(ItemEntity, item);
    const updatedEntity = await this.itemRepository.save(entity);
    return plainToInstance(ItemVO, updatedEntity);
  }

  async deleteItem(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async updateStock(id: string, stock: number): Promise<void> {
    await this.itemRepository.update(id, { stock });
  }
}
