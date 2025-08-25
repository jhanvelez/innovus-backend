import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Meter } from 'src/meter/entities/meter.entity';
import { ReadingSession } from 'src/reading-session/entities/reading-session.entity';
import { ReadingEvidence } from './readingevidence.entity';
import { ReadingCausal } from './readingcausal.entity';
@Entity()
export class Reading {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  cycle: string;

  @Column({ length: 50 })
  route: string;

  @ManyToOne(() => Meter)
  @JoinColumn({ name: 'meterId' })
  meter: Meter;

  @ManyToOne(() => ReadingSession)
  @JoinColumn({ name: 'sessionId' })
  session: ReadingSession;

  // Tipo de resultado (evidence o causal)
  @Column({ type: 'enum', enum: ['EVIDENCE', 'CAUSAL'] })
  type: 'EVIDENCE' | 'CAUSAL';

  // Relación 1 a 1 con la entidad de captura (opcional)
  @OneToOne(() => ReadingEvidence, { nullable: true })
  @JoinColumn()
  evidence?: ReadingEvidence;

  // Relación 1 a 1 con la entidad de causal (opcional)
  @OneToOne(() => ReadingCausal, { nullable: true })
  @JoinColumn()
  causal?: ReadingCausal;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
