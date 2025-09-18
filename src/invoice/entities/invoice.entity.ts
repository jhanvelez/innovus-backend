import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Meter } from 'src/meter/entities/meter.entity';
import { Property } from 'src/property/entities/property.entity';
import { ReadingSession } from 'src/reading-session/entities/reading-session.entity';

export enum InvoiceStatus {
  PENDING = 'pendiente',
  PAID = 'pagado',
  CANCELED = 'anulado',
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Property, { eager: false })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @ManyToOne(() => Meter, { eager: true })
  @JoinColumn({ name: 'meterId' })
  meter: Meter;

  @ManyToOne(() => ReadingSession, { eager: true })
  @JoinColumn({ name: 'readingSessionId' })
  readingSession: ReadingSession;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  consumption: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  valueBeforeAdjustments: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  valueAfterAdjustments: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  fixedCharge: number;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.PENDING })
  status: InvoiceStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
