import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './infrastructure/database/repository/payment.repository';
import { OrderEntity } from './infrastructure/database/entity/order.entity';
import { OrderItemEntity } from './infrastructure/database/entity/order-item.entity';
import { CartItemEntity } from './infrastructure/database/entity/cart-item.entity';
import { CartEntity } from './infrastructure/database/entity/cart.entity';
import { CartController } from './interface/cart.controller';
import { AddItemCommandHandler } from './application/command/add-item.handler';
import { ItemAdapter } from './infrastructure/adapter/item.adapter';
import { UserAdapter } from './infrastructure/adapter/user.adapter';
import { SeatsIOAdapter } from './infrastructure/adapter/seats-io.adapter';
import { ItemProcessorFactory } from './application/factory/item-processor.factory';
import { SeatsIOService } from '@shared/seats-io/seats-io.service';
import { SeatsIOOptions } from '@shared/seats-io/seats-io.options';
import { ConfigModule } from '@nestjs/config';
import { NormalItemProcessor } from '@payment/domain/service/item/normal-item.processor';
import { SeatItemProcessor } from '@payment/domain/service/item/seat-item.processor';
import { FreeItemProcessor } from '@payment/domain/service/item/free-item.processor';

const commandHandlers = [AddItemCommandHandler];
const queryHandlers = [];
const eventHandlers = [];
const repositories = [
  {
    provide: 'PaymentRepository',
    useClass: PaymentRepository,
  },
];
const caches = [];
const adapters = [
  {
    provide: 'ItemPort',
    useClass: ItemAdapter,
  },
  {
    provide: 'UserPort',
    useClass: UserAdapter,
  },
  {
    provide: 'SeatsIOAdapter',
    useClass: SeatsIOAdapter,
  },
];
const processors = [NormalItemProcessor, SeatItemProcessor, FreeItemProcessor];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartEntity,
      CartItemEntity,
      OrderEntity,
      OrderItemEntity,
    ]),
    CqrsModule,
    ConfigModule,
  ],
  controllers: [CartController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...caches,
    ...adapters,
    ...processors,
    ItemProcessorFactory,
    SeatsIOService,
    SeatsIOOptions,
    Logger,
  ],
})
export class PaymentModule {}
