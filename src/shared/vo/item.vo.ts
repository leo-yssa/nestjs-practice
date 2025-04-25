import { ItemType } from '@shared/type/item.type';

export class ItemVO {
  constructor(
    private id: string,
    private name: string,
    private price: number,
    private stock: number,
    private type: ItemType,
    private eventId: string,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}
  get getId(): string {
    return this.id;
  }
  get getName(): string {
    return this.name;
  }
  get getPrice(): number {
    return this.price;
  }
  get getStock(): number {
    return this.stock;
  }
  get getType(): ItemType {
    return this.type;
  }
  get getEventId(): string {
    return this.eventId;
  }
  get getCreatedAt(): Date {
    return this.createdAt;
  }
  get getUpdatedAt(): Date {
    return this.updatedAt;
  }
  decreaseStock(quantity: number) {
    this.stock -= quantity;
  }
}
