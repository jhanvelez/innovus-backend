import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsumptionRange } from './entities/rank.entity';
import { CreateConsumptionRangeDto } from './dto/create-rank.dto';
import { UpdateConsumptionRangeDto } from './dto/update-rank.dto';

@Injectable()
export class RanksService {
  constructor(
    @InjectRepository(ConsumptionRange)
    private readonly rangeRepo: Repository<ConsumptionRange>,
  ) {}

  async create(dto: CreateConsumptionRangeDto): Promise<ConsumptionRange> {
    const range = this.rangeRepo.create(dto);
    return this.rangeRepo.save(range);
  }

  findAll(): Promise<ConsumptionRange[]> {
    return this.rangeRepo.find();
  }

  async findOne(id: number): Promise<ConsumptionRange> {
    const range = await this.rangeRepo.findOne({ where: { id } });
    if (!range) throw new NotFoundException('Range not found');
    return range;
  }

  async update(
    id: number,
    dto: UpdateConsumptionRangeDto,
  ): Promise<ConsumptionRange> {
    const range = await this.findOne(id);
    Object.assign(range, dto);
    return this.rangeRepo.save(range);
  }

  async remove(id: number): Promise<void> {
    const range = await this.findOne(id);
    await this.rangeRepo.remove(range);
  }
}
