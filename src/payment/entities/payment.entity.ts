import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp' })
  paymentDate: Date;

  @Column()
  paymentMethod: string;

  @Column()
  reference: string;

  @Column({ nullable: true })
  description: string;
}
