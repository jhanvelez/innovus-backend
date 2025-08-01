import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Billing } from 'src/billing/entities/billing.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Billing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'billingId' })
  billing: Billing;

  @Column({ length: 100 })
  number: string;

  @Column()
  emissionDate: Date;

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ length: 50 })
  type: string;
}
