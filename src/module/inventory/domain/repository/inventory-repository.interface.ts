import { EntityManager } from 'typeorm';
import { ProductOptionVO } from '@inventory/domain/vo/product-option.vo';
import { ProductStockVO } from '@inventory/domain/vo/product-stock.vo';
import { ProductItemVO } from '@inventory/domain/vo/product-item.vo';
import { ProductOrderVO, UpdateProductOrderStatusWithPaymentIdInputVO } from '@inventory/domain/vo/product-order.vo';
import { ProductOrderItemVO } from '@inventory/domain/vo/product-order-item.vo';
import { GetProductOrderByIdInputVO } from '@inventory/domain/vo/product-order.vo';

export interface IInventoryRepository {
  getProductStocksByOptionIds(optionIds: string[], manager?: EntityManager): Promise<ProductStockVO[]>;
  getProductItems(productOptions: ProductOptionVO[], manager?: EntityManager): Promise<ProductItemVO[]>;
  createProductOrder(order: ProductOrderVO, manager?: EntityManager): ProductOrderVO;
  getProductOrderById(vo: GetProductOrderByIdInputVO, manager?: EntityManager): Promise<ProductOrderVO>;
  updateProductOrderStatusWithPaymentId(
    vo: UpdateProductOrderStatusWithPaymentIdInputVO,
    manager?: EntityManager,
  ): Promise<ProductOrderVO>;
  createProductOrderItem(orderItem: ProductOrderItemVO, manager?: EntityManager): ProductOrderItemVO;
  updateProductStocks(stocks: ProductStockVO[], manager?: EntityManager): Promise<ProductStockVO[]>;
  updateProductItems(items: ProductItemVO[], manager?: EntityManager): Promise<ProductItemVO[]>;
  saveProductOrder(order: ProductOrderVO, manager?: EntityManager): Promise<ProductOrderVO>;
}
