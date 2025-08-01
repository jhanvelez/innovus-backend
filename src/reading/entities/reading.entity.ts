import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Suscriptor } from 'src/suscriptor/entities/suscriptor.entity';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fechaLectura: Date;

  @Column({ length: 50 })
  ciclo: string;

  @Column({ length: 50 })
  ruta: string;

  @Column('float')
  lecturaAnterior: number;

  @Column('float')
  lecturaActual: number;

  @Column('float')
  consumoPeriodo: number;

  @Column({ length: 100 })
  lector: string;

  @Column()
  medidorId: number;

  @ManyToOne(() => Suscriptor)
  @JoinColumn({ name: 'suscriptorId' })
  suscriptor: Suscriptor;
}
