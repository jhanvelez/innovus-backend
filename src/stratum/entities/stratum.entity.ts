import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubsidyContribution } from 'src/subsidy-contribution/entities/subsidy-contribution.entity';

@Entity()
export class Stratum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => SubsidyContribution,
    (subsidyContribution) => subsidyContribution.stratum,
  )
  subsidyContributions: SubsidyContribution[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
