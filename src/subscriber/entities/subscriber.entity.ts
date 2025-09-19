import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Stratum } from 'src/stratum/entities/stratum.entity';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  identification: number;

  @Column({ length: 50 })
  category: string;

  @ManyToOne(() => Stratum, { eager: true, nullable: true })
  stratum: Stratum;

  @Column({ length: 100 })
  nameOwner: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
