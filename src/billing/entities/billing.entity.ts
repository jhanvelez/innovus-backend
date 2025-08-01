import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';
import { Meter } from 'src/meter/entities/meter.entity';
import { Reading } from 'src/reading/entities/reading.entity';

@Entity()
export class Billing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  period: string;

  @Column('int')
  daysCount: number;

  @Column('float')
  totalValue: number;

  @ManyToOne(() => Subscriber)
  @JoinColumn({ name: 'subscriberId' })
  subscriber: Subscriber;

  @ManyToOne(() => Meter)
  @JoinColumn({ name: 'meterId' })
  meter: Meter;

  @ManyToOne(() => Reading)
  @JoinColumn({ name: 'readingId' })
  reading: Reading;

  // Esto se mejora luego con tabla BillingConcepts
  @Column({ type: 'json', nullable: true })
  concepts: any;
}
