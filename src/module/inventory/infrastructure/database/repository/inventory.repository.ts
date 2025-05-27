import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { IInventoryRepository } from '@inventory/domain/repository/inventory-repository.interface';
import { ProductOptionVO } from '@inventory/domain/vo/product-option.vo';
import { ProductStockEntity } from '@inventory/infrastructure/database/entity/product-stock.entity';
import { ProductItemEntity } from '@inventory/infrastructure/database/entity/product-item.entity';
import { ProductStockVO } from '@inventory/domain/vo/product-stock.vo';
import { ProductItemVO } from '@inventory/domain/vo/product-item.vo';
import {
  GetProductOrderByIdInputVO,
  ProductOrderVO,
  UpdateProductOrderStatusWithPaymentIdInputVO,
} from '@inventory/domain/vo/product-order.vo';
import { ProductOrderEntity } from '@inventory/infrastructure/database/entity/product-order.entity';
import { ProductOrderItemVO } from '@inventory/domain/vo/product-order-item.vo';
import { ProductOrderItemEntity } from '@inventory/infrastructure/database/entity/product-order-item.entity';
@Injectable()
export class InventoryRepository implements IInventoryRepository {
  constructor(
    private datasource: DataSource,
    @InjectRepository(ProductStockEntity)
    private productStockRepository: Repository<ProductStockEntity>,
    @InjectRepository(ProductItemEntity)
    private productItemRepository: Repository<ProductItemEntity>,
    @InjectRepository(ProductOrderEntity)
    private productOrderRepository: Repository<ProductOrderEntity>,
  ) {}

  async getProductStocksByOptionIds(optionIds: string[], manager?: EntityManager): Promise<ProductStockVO[]> {
    return plainToInstance(
      ProductStockVO,
      await manager
        .createQueryBuilder(ProductStockEntity, 'product_stocks')
        .setLock('pessimistic_write')
        .where('product_stocks.product_option_id IN (:...optionIds)', {
          optionIds,
        })
        .getMany(),
    );
  }

  async getProductItems(productOptions: ProductOptionVO[], manager?: EntityManager): Promise<ProductItemVO[]> {
    const optionIds = productOptions.map((option) => option.id);
    return plainToInstance(
      ProductItemVO,
      await manager
        .createQueryBuilder(ProductItemEntity, 'product_items')
        .setLock('pessimistic_write')
        .where('product_items.product_option_id IN (:...optionIds)', {
          optionIds,
        })
        .andWhere('product_items.status = :status', { status: 'available' })
        .getMany(),
    );
  }

  createProductOrder(order: ProductOrderVO, manager?: EntityManager): ProductOrderVO {
    return plainToInstance(
      ProductOrderVO,
      manager.create(ProductOrderEntity, {
        user: { id: order.userId },
        quantity: order.quantity,
        items: [],
      }),
    );
  }

  async getProductOrderById(vo: GetProductOrderByIdInputVO, manager?: EntityManager): Promise<ProductOrderVO> {
    const order = await manager
      .createQueryBuilder(ProductOrderEntity, 'product_orders')
      .setLock('pessimistic_write')
      .leftJoinAndSelect('product_orders.items', 'product_order_items')
      .leftJoinAndSelect('product_order_items.item', 'product_items')
      .where('product_orders.id = :orderId', { orderId: vo.id })
      .getOne();
    return plainToInstance(ProductOrderVO, order);
  }

  async updateProductOrderStatusWithPaymentId(
    vo: UpdateProductOrderStatusWithPaymentIdInputVO,
    manager?: EntityManager,
  ): Promise<ProductOrderVO> {
    return plainToInstance(
      ProductOrderVO,
      await manager.update(ProductOrderEntity, vo.id, {
        paymentStatus: vo.paymentStatus,
        paymentId: vo.paymentId,
      }),
    );
  }

  createProductOrderItem(orderItem: ProductOrderItemVO, manager?: EntityManager): ProductOrderItemVO {
    return plainToInstance(
      ProductOrderItemVO,
      manager.create(ProductOrderItemEntity, {
        order: { id: orderItem.order.id },
        item: { id: orderItem.item.id },
      }),
    );
  }

  async updateProductStocks(stocks: ProductStockVO[], manager?: EntityManager): Promise<ProductStockVO[]> {
    await manager.save(ProductStockEntity, stocks);
    return stocks;
  }

  async updateProductItems(items: ProductItemVO[], manager?: EntityManager): Promise<ProductItemVO[]> {
    await manager.save(ProductItemEntity, plainToInstance(ProductItemEntity, items));
    return items;
  }

  async saveProductOrder(order: ProductOrderVO, manager?: EntityManager): Promise<ProductOrderVO> {
    return plainToInstance(
      ProductOrderVO,
      manager.save(ProductOrderEntity, plainToInstance(ProductOrderEntity, order)),
    );
  }
}
