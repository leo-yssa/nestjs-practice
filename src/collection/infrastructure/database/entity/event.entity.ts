import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CollectionEntity } from './collection.entity';
import { EventOptionEntity } from './event-option.entity';

@Entity('events')
export class EventEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string;

  @Column()
  name: string;

  @Column()
  publicKey: string;

  @Column()
  collectionId: string;

  @ManyToOne(() => CollectionEntity, (collection) => collection.events, {
    cascade: false,
  })
  @JoinColumn({ name: 'collection_id', referencedColumnName: 'id' })
  collection: CollectionEntity;

  @OneToMany(() => EventOptionEntity, (eventOption) => eventOption.event, {
    cascade: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'event_id' })
  options: EventOptionEntity[];
}
