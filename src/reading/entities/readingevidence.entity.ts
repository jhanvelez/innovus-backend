import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Reading } from './reading.entity';

@Entity()
export class ReadingEvidence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  photo?: string;

  @Column('float')
  value: number;

  @OneToOne(() => Reading, (reading) => reading.evidence)
  reading: Reading;
}
