import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Predio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fichaCatastral: string;

  @Column({ length: 255 })
  direccion: string;
}
