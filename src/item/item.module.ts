import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from '@item/infrastructure/database/repository/item.repository';
import { ItemEntity } from '@item/infrastructure/database/entity/item.entity';
import { ItemController } from '@item/interface/item.controller';
import { GetItemQueryHandler } from '@item/application/query/get-item.handler';
import { UpdateStockCommandHandler } from './application/command/update-stock.handler';
const commandHandlers = [UpdateStockCommandHandler];
const queryHandlers = [GetItemQueryHandler];
const eventHandlers = [];
const repositories = [
  {
    provide: 'ItemRepository',
    useClass: ItemRepository,
  },
];
const caches = [];
const services = [];
@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity]), CqrsModule],
  controllers: [ItemController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...caches,
    ...services,
    Logger,
  ],
})
export class ItemModule {}
