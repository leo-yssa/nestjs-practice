import { ProductSaleType } from '@shared/type/product.type';

export interface ProductPort {
  getProductSaleSettingById(id: string): Promise<{
    saleType: ProductSaleType;
  }>;
}
