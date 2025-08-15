import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from 'src/property/entities/property.entity';

@Entity()
export class Meter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => Property, (property) => property.meters)
  property: Property;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
