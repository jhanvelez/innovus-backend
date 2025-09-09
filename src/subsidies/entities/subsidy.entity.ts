import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subsidies')
export class Subsidy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userType: string; // residential, commercial, industrial, official

  @Column()
  stratum: number; // 1 to 6, or 0 if not applicable

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  subsidyPercent: number; // e.g. 15.00 = 15%

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  contributionPercent: number; // e.g. 50.00 = 50%

  @Column({ default: true })
  active: boolean;
}
