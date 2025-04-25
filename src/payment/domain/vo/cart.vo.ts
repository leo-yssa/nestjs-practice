import { CartItemVO } from './cart-item.vo';

export class CartVO {
  constructor(
    private id: string,
    private items: CartItemVO[],
  ) {}
  get getId(): string {
    return this.id;
  }
  get getItems(): CartItemVO[] {
    return this.items;
  }
  addItem(item: CartItemVO) {
    this.items.push(item);
  }
  clearItems() {
    this.items = [];
  }
}
