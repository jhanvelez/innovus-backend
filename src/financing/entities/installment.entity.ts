import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PaymentPlan } from './payment-plan.entity';

@Entity('installments')
export class Installment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PaymentPlan, (p) => p.installmentsList, {
    onDelete: 'CASCADE',
  })
  plan: PaymentPlan;

  @Column()
  installmentNumber: number;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ default: 'PENDING' })
  status: string; // PENDING, PARTIAL, PAID

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'date', nullable: true })
  paidAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
