import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';
import { Meter } from 'src/meter/entities/meter.entity';

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

  @OneToMany(() => Meter, (meter) => meter.property)
  meters: Meter[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
