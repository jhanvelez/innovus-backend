import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Reading } from './reading.entity';

@Entity()
export class ReadingEvidence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  photo: string;

  @Column('float')
  value: number;

  @OneToOne(() => Reading, (reading) => reading.evidence)
  @JoinColumn({ name: 'readingId' })
  reading: Reading;
}
