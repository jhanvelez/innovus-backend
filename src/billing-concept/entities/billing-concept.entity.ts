import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Billing } from 'src/billing/entities/billing.entity';

@Entity()
export class BillingConcept {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Billing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'billingId' })
  billing: Billing;

  @Column({ length: 100 })
  name: string;

  @Column('float')
  amount: number;

  @Column('float')
  unitValue: number;

  @Column('float')
  quantity: number;

  @Column({ length: 50 })
  type: string;
}
