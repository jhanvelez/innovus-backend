import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Reading } from './reading.entity';

@Entity()
export class ReadingCausal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  causalId: string;

  @OneToOne(() => Reading, (reading) => reading.causal)
  @JoinColumn({ name: 'readingId' })
  reading: Reading;
}
