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
import { Cycle } from 'src/cycles-routes/entities/cycle.entity';
import { Stratum } from 'src/stratum/entities/stratum.entity';
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

  @ManyToOne(() => Stratum)
  @JoinColumn({ name: 'stratumId' })
  stratum: Stratum;

  @ManyToOne(() => Cycle)
  @JoinColumn({ name: 'cycleId' })
  cycle: Cycle;

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

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
