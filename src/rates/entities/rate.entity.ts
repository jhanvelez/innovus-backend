import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Stratum } from 'src/stratum/entities/stratum.entity';

@Entity('rates')
export class Rate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  subsidyPercent: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  contributionPercent: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  fixedCharge: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  basic: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  complementary: number;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  sanctuary: number;

  @Column()
  year: number;

  @Column()
  month: number;

  @ManyToOne(() => Stratum)
  @JoinColumn({ name: 'stratumId' })
  stratum: Stratum;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
