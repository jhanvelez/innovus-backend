import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';
import { Tenant } from 'src/tenant/entities/tenant.entity';
import { Meter } from 'src/meter/entities/meter.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  cadastralRecord: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 50 })
  cycle: string;

  @Column({ length: 50 })
  route: string;

  @ManyToOne(() => Subscriber)
  @JoinColumn({ name: 'subscriberId' })
  subscriber: Subscriber;

  @ManyToOne(() => Tenant)
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @OneToMany(() => Meter, (meter) => meter.property)
  meters: Meter[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
