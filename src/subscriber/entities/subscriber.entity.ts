import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Predio } from 'src/predio/entities/predio.entity';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  identificacion: string;

  @Column({ type: 'date' })
  fechaSuscripcion: Date;

  @Column({ length: 50 })
  categoria: string;

  @Column({ length: 100 })
  nombrePropietario: string;

  @Column({ length: 100 })
  usuario: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 20 })
  tel: string;

  @Column({ length: 100 })
  correoElectronico: string;

  @Column({ length: 100 })
  medidor: string;

  @Column({ length: 50 })
  ciclo: string;

  @Column({ length: 50 })
  ruta: string;

  @ManyToOne(() => Predio)
  @JoinColumn({ name: 'predioId' })
  predio: Predio;
}
