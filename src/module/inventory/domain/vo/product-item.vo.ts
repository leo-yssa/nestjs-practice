export class ProductItemVO {
  constructor(
    public readonly id: string,
    public status: string,
    public readonly blockStatus: string,
    public readonly productId: string,
    public readonly productOptionId: string,
    public readonly tokenId: string,
    public readonly ownerId: string,
    public readonly title: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
