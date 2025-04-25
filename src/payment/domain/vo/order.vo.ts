import { UserVO } from '@shared/vo/user.vo';
import { OrderItemVO } from './order-item.vo';
import { ulid } from 'ulid';

export class OrderVO {
  constructor(
    private id: string,
    private user: UserVO,
    private items: OrderItemVO[],
  ) {}
  get getId(): string {
    return this.id;
  }
  get getUser(): UserVO {
    return this.user;
  }
  get getItems(): OrderItemVO[] {
    return this.items;
  }
  generateId(): void {
    this.id = ulid();
  }
  addItem(item: OrderItemVO): void {
    this.items.push(item);
  }
}
