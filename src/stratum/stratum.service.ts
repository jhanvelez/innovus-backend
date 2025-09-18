import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stratum } from './entities/stratum.entity';

@Injectable()
export class StratumService {
  constructor(
    @InjectRepository(Stratum)
    private strataRepository: Repository<Stratum>,
  ) {}

  findOne(id: string): Promise<Stratum> {
    return this.strataRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<{
    data: Stratum[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const page = 10;
    const limit = 10;

    const qb = this.strataRepository.createQueryBuilder('stratum');

    const [data, total] = await qb
      .orderBy('stratum.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
