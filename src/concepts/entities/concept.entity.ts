import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('concepts')
export class Concept {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ default: 'variable' })
  type: string;

  @Column({ nullable: true })
  calculationBase: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  value: number;

  @Column({ default: true })
  active: boolean;
}
