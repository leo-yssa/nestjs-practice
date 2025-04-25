export class OrderItemVO {
  constructor(
    private id: string,
    private quantity: number,
    private priceAtPurchase: number,
  ) {}
  get getId(): string {
    return this.id;
  }
  get getQuantity(): number {
    return this.quantity;
  }
  get getPriceAtPurchase(): number {
    return this.priceAtPurchase;
  }
}
