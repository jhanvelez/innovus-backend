import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('agreements')
export class Agreement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  amount: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  active: boolean;
}
