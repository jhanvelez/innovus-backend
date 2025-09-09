import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payment_plans')
export class PaymentPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number; // reference to customer entity

  @Column()
  invoiceId: number; // reference to the original invoice

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  financedAmount: number; // total financed value

  @Column()
  installments: number; // number of installments

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  interestRate: number; // percentage

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  installmentValue: number; // value per installment

  @Column({ default: 'active' })
  status: string; // active, completed, cancelled
}
