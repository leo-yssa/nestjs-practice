import { ItemVO } from '@shared/vo/item.vo';

export interface IItemPort {
  updateStock(itemId: string, stock: number): Promise<void>;
  getItemById(id: string): Promise<ItemVO>;
}
