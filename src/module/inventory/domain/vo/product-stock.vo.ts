export class ProductStockVO {
  constructor(
    public readonly id: string,
    public readonly productOptionId: string,
    public available: number,
    public hold: number,
    public sold: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
