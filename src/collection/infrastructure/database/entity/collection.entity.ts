import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('collections')
export class CollectionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  networkId: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany(() => EventEntity, (event) => event.collectionId, {
    cascade: false,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'collection_id' })
  events: EventEntity[];
}
