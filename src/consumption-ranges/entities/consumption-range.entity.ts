import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Stratum } from 'src/stratum/entities/stratum.entity';

@Entity()
export class ConsumptionRange {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  min: number;

  @Column('int')
  max: number;

  @Column({ length: 50 })
  type: string;

  @Column('decimal', { precision: 10, scale: 2 })
  rate: number;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Stratum, { eager: true })
  stratum: Stratum;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
