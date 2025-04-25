import { ItemVO } from '@shared/vo/item.vo';

export class CartItemVO {
  constructor(
    private id: string,
    private item: ItemVO,
    private quantity: number,
    private createdAt: Date,
    private updatedAt: Date,
    private selectedSeats?: string[],
  ) {}
  get getId(): string {
    return this.id;
  }
  get getItem(): ItemVO {
    return this.item;
  }
  get getQuantity(): number {
    return this.quantity;
  }
  get getSelectedSeats(): string[] {
    return this.selectedSeats;
  }
  get getCreatedAt(): Date {
    return this.createdAt;
  }
  get getUpdatedAt(): Date {
    return this.updatedAt;
  }
  increaseQuantity(quantity: number) {
    this.quantity += quantity;
  }
}
