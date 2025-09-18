import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Stratum } from 'src/stratum/entities/stratum.entity';

export enum SubsidyContributionType {
  SUBSIDY = 'subsidio',
  CONTRIBUTION = 'contribucion',
}

@Entity()
@Unique(['stratum', 'type'])
export class SubsidyContribution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Stratum, (stratum) => stratum.subsidyContributions, {
    eager: true,
  })
  stratum: Stratum;

  @Column({ type: 'enum', enum: SubsidyContributionType })
  type: SubsidyContributionType;

  @Column('float')
  value: number;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
