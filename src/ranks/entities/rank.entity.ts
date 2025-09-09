import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('consumption_ranges')
export class ConsumptionRange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  minValue: number;

  @Column()
  maxValue: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  rate: number;

  @Column({ default: true })
  active: boolean;
}
