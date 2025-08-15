import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

import { Reading } from './entities/reading.entity';
import { Meter } from 'src/meter/entities/meter.entity';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Reading)
    private readonly readigRepository: Repository<Reading>,
  ) {}

  async findAll(query: PaginationQueryDto): Promise<{
    data: Reading[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.readigRepository.createQueryBuilder('property');

    if (search) {
      qb.where(
        'property.cadastralRecord ILIKE :search OR property.address ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .orderBy('property.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(dto: CreateReadingDto): Promise<{
    data: Reading;
    status: boolean;
    message: string;
  }> {
    const entity = this.readigRepository.create({
      ...dto,
      meter: { id: dto.meterId } as Meter,
    });
    const saved = await this.readigRepository.save(entity);

    return {
      data: saved,
      status: true,
      message: 'Registro exitoso',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} reading`;
  }

  async update(
    id: string,
    updatePropertyDto: UpdateReadingDto,
  ): Promise<Reading> {
    const subscriber = await this.readigRepository.preload({
      id,
      ...updatePropertyDto,
    });

    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }

    return await this.readigRepository.save(subscriber);
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
