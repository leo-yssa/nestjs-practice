import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './infrastructure/database/entity/collection.entity';
import { EventEntity } from './infrastructure/database/entity/event.entity';
import { EventOptionEntity } from './infrastructure/database/entity/event-option.entity';
import { CollectionRepository } from './infrastructure/database/repository/collection.repository';
import { CollectionController } from './interface/collection.controller';
import { ItemEntity } from './infrastructure/database/entity/item.entity';

const commandHandlers = [];
const queryHandlers = [];
const eventHandlers = [];
const repositories = [
  {
    provide: 'CollectionRepository',
    useClass: CollectionRepository,
  },
];
const caches = [];
@Module({
  imports: [
    TypeOrmModule.forFeature([
      CollectionEntity,
      EventEntity,
      EventOptionEntity,
      ItemEntity,
    ]),
    CqrsModule,
  ],
  controllers: [CollectionController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...caches,
    Logger,
  ],
})
export class CollectionModule {}
