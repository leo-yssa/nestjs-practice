import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SeatsIOService } from '@seats-io/seats-io.service';
import { SeatsIOOptions } from '@seats-io/seats-io.options';
import { ConfigModule } from '@nestjs/config';
import { PortonePaymentService } from '@portone/portone-payment.service';
import { PortoneSettlementService } from '@portone/portone-settlement.service';
import { PortoneOptionV1 } from '@portone/portone.option.v1';
import { PortoneOptionV2 } from '@portone/portone.option.v2';
import { PreCheckoutCommandHandler } from '@inventory/application/handler/pre-checkout.handler';
import { InventoryRepository } from '@inventory/infrastructure/database/repository/inventory.repository';
import { OrderController } from '@inventory/interface/controller/order.controller';
import { ProductOrderEntity } from '@inventory/infrastructure/database/entity/product-order.entity';
import { ProductOrderItemEntity } from '@inventory/infrastructure/database/entity/product-order-item.entity';
import { ProductItemEntity } from '@inventory/infrastructure/database/entity/product-item.entity';
import { ProductStockEntity } from '@inventory/infrastructure/database/entity/product-stock.entity';
import { OrderService } from './application/service/order.service';
import { PortoneSettlementAdapter } from '@inventory/infrastructure/adapter/portone-settlement.adapter';
import { PortonePaymentAdapter } from '@inventory/infrastructure/adapter/portone-payment.adapter';
import { CallbackCommandHandler } from '@inventory/application/handler/callback.handler';
import { WebhookCommandHandler } from '@inventory/application/handler/webhook.handler';
import { ConfirmCommandHandler } from '@inventory/application/handler/confirm.handler';
import { CheckoutCommandHandler } from '@inventory/application/handler/checkout.handler';

const commandHandlers = [
  PreCheckoutCommandHandler,
  CheckoutCommandHandler,
  CallbackCommandHandler,
  ConfirmCommandHandler,
  WebhookCommandHandler,
];
const queryHandlers = [];
const eventHandlers = [];
const repositories = [
  {
    provide: 'InventoryRepository',
    useClass: InventoryRepository,
  },
];
const caches = [];
const adapters = [
  {
    provide: 'PortoneSettlementPort',
    useClass: PortoneSettlementAdapter,
  },
  {
    provide: 'PortonePaymentPort',
    useClass: PortonePaymentAdapter,
  },
];
const factories = [];
const services = [
  {
    provide: 'OrderService',
    useClass: OrderService,
  },
];
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductItemEntity, ProductStockEntity, ProductOrderEntity, ProductOrderItemEntity]),
    CqrsModule,
    ConfigModule,
    HttpModule,
  ],
  controllers: [OrderController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...caches,
    ...adapters,
    ...factories,
    ...services,
    SeatsIOService,
    SeatsIOOptions,
    PortonePaymentService,
    PortoneOptionV1,
    PortoneSettlementService,
    PortoneOptionV2,
    Logger,
  ],
})
export class InventoryModule {}
