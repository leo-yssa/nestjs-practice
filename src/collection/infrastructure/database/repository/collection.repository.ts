import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { CollectionEntity } from '../entity/collection.entity';
import { EventEntity } from '../entity/event.entity';
import { EventOptionEntity } from '../entity/event-option.entity';
import { ICollectionRepository } from '@collection/domain/repository/collection.repository.interface';
import { ItemEntity } from '../entity/item.entity';
@Injectable()
export class CollectionRepository implements ICollectionRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(CollectionEntity)
    private collectionRepository: Repository<CollectionEntity>,
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(EventOptionEntity)
    private eventOptionRepository: Repository<EventOptionEntity>,
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}
}
