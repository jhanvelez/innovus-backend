import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  cadastralRecord: string;

  @Column({ length: 255 })
  address: string;

  @ManyToOne(() => Subscriber)
  @JoinColumn({ name: 'subscriberId' })
  subscriber: Subscriber;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
