import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Reading } from 'src/reading/entities/reading.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Reading)
    private readonly readigRepository: Repository<Reading>,
  ) {}

  async findAll(sessionId: string) {
    const qb = this.readigRepository
      .createQueryBuilder('reading')
      .leftJoin('reading.meter', 'meter')
      .leftJoin('meter.property', 'property')
      .leftJoin('property.tenant', 'tenant')
      .leftJoin('reading.evidence', 'evidence')
      .leftJoin('reading.causal', 'causal')
      .select([
        'reading.id',
        'reading.cycle',
        'reading.route',
        'reading.type',
        'reading.createdAt',
        'meter.serialNumber',
        'property.address',
        'tenant.fullName',
        'evidence.value',
        'evidence.photo',
        'causal.causalId',
      ])
      .where('reading.sessionId = :sessionId', { sessionId: sessionId });

    const [data] = await qb
      .orderBy('reading.createdAt', 'DESC')
      .getManyAndCount();

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
