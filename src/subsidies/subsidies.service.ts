import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subsidy } from './entities/subsidy.entity';
import { CreateSubsidyDto } from './dto/create-subsidy.dto';
import { UpdateSubsidyDto } from './dto/update-subsidy.dto';

@Injectable()
export class SubsidiesService {
  constructor(
    @InjectRepository(Subsidy)
    private readonly subsidyRepo: Repository<Subsidy>,
  ) {}

  async create(dto: CreateSubsidyDto): Promise<Subsidy> {
    const subsidy = this.subsidyRepo.create(dto);
    return this.subsidyRepo.save(subsidy);
  }

  findAll(): Promise<Subsidy[]> {
    return this.subsidyRepo.find();
  }

  async findOne(id: number): Promise<Subsidy> {
    const subsidy = await this.subsidyRepo.findOne({ where: { id } });
    if (!subsidy) throw new NotFoundException('Subsidy not found');
    return subsidy;
  }

  async update(id: number, dto: UpdateSubsidyDto): Promise<Subsidy> {
    const subsidy = await this.findOne(id);
    Object.assign(subsidy, dto);
    return this.subsidyRepo.save(subsidy);
  }

  async remove(id: number): Promise<void> {
    const subsidy = await this.findOne(id);
    await this.subsidyRepo.remove(subsidy);
  }
}
