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

  findOne(id: number) {
    return this.strataRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.strataRepository.find();
  }
}
