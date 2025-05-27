import { ExtendedLoggerService } from '@config/logger/extended-logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductPort } from '@inventory/domain/port/product.port';
import { PRODUCT_SALE_TYPE, ProductSaleType } from '@shared/type/product.type';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class ProductAdapter implements ProductPort {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: ExtendedLoggerService,
  ) {}

  async getProductSaleSettingById(id: string): Promise<{
    saleType: ProductSaleType;
  }> {
    this.logger.log(`getProductSaleSettingById: ${id}`);
    return {
      saleType: PRODUCT_SALE_TYPE.DATE_SELECT,
    };
  }
}
