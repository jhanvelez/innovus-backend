import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Meter } from 'src/meter/entities/meter.entity';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  cycle: string;

  @Column({ length: 50 })
  route: string;

  @Column({ length: 50 })
  photo: string;

  @Column('float')
  reading: number;

  @ManyToOne(() => Meter)
  @JoinColumn({ name: 'meterId' })
  meter: Meter;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
