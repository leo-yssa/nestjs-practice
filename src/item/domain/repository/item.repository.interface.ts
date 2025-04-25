import { ItemVO } from '@shared/vo/item.vo';

export interface IItemRepository {
  createItem(item: ItemVO): Promise<ItemVO>;
  findById(id: string): Promise<ItemVO>;
  updateItem(item: ItemVO): Promise<ItemVO>;
  deleteItem(id: string): Promise<void>;
  updateStock(id: string, stock: number): Promise<void>;
}
