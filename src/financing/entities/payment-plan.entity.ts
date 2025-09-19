import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity'; // cliente
import { Invoice } from 'src/invoice/entities/invoice.entity'; // facturas
import { Installment } from './installment.entity';

@Entity('payment_plans')
export class PaymentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Subscriber, { eager: true })
  subscriber: Subscriber;

  @ManyToOne(() => Invoice, { eager: true })
  invoice: Invoice; // factura base (opcional: puede ser varias después)

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  financedAmount: number;

  @Column({ type: 'int' })
  installments: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  interestRate: number; // %

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  installmentValue: number;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => Installment, (i) => i.plan, { cascade: true })
  installmentsList: Installment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
