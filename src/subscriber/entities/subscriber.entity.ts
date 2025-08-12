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

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  identification: string;

  @Column({ length: 50 })
  category: string;

  @Column({ length: 100 })
  nameOwner: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 50 })
  cycle: string;

  @Column({ length: 50 })
  route: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
