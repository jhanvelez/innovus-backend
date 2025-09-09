import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stratum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
