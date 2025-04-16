import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { ItemEntity } from './item.entity';

@Entity('event_options')
export class EventOptionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  publicKey: string;

  @Column()
  eventId: string;

  @ManyToOne(() => EventEntity, (event) => event.options, {
    cascade: false,
  })
  @JoinColumn({ name: 'event_id', referencedColumnName: 'id' })
  event: EventEntity;

  @OneToMany(() => ItemEntity, (item) => item.eventOption)
  items: ItemEntity[];
}
