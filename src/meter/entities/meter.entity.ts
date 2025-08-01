import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Meter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  serialNumber: string;

  @Column({ length: 100 })
  brand: string;

  @Column({ length: 100 })
  model: string;

  @Column('float')
  diameter: number;

  @Column({ length: 100 })
  type: string;

  @Column({ type: 'date' })
  installationDate: Date;

  @Column({ length: 100 })
  installer: string;

  @Column({ length: 100 })
  provider: string;

  @Column({ type: 'date' })
  purchaseDate: Date;

  @Column('float')
  value: number;
}
