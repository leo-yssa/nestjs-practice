import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { EventOptionEntity } from './event-option.entity';

@Entity('item')
export class ItemEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => EventOptionEntity, (option) => option.items)
  @JoinColumn({ name: 'event_option_id' })
  eventOption: EventOptionEntity;

  @Column()
  eventOptionId: string;
}