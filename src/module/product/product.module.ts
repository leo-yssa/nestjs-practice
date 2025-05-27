import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductContentImageEntity } from './infrastructure/database/entity/product-content-image.entity';
import { ProductDetailEntity } from './infrastructure/database/entity/product-detail.entity';
import { ProductOptionSlotEntity } from './infrastructure/database/entity/product-option-slot.entity';
import { ProductOptionValueEntity } from './infrastructure/database/entity/product-option-value.entity';
import { ProductSaleSettingEntity } from './infrastructure/database/entity/product-sale-setting.entity';
import { ProductEntity } from './infrastructure/database/entity/product.entity';
import { ProductOptionEntity } from './infrastructure/database/entity/product-option.entity';

const commandHandlers = [];
const queryHandlers = [];
const eventHandlers = [];
const repositories = [
  // {
  //     provide: '',
  //     useClass
  // }
];
const caches = [];
const adapters = [
  // {
  //     provide:''
  //     useClass:
  // }
];
const processors = [];
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductSaleSettingEntity,
      ProductDetailEntity,
      ProductContentImageEntity,
      ProductOptionSlotEntity,
      ProductOptionValueEntity,
      ProductOptionEntity,
    ]),
  ],
  controllers: [],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...caches,
    ...adapters,
    ...processors,
  ],
})
export class ProductModule {}
