import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('calls')
export class Call {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column({ name: 'call_duration' })
  callDuration: string;

  @Column()
  title: string;

  @Column('text')
  description: string;
}
