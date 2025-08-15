import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Meter } from './entities/meter.entity';
import { Property } from 'src/property/entities/property.entity';

@Injectable()
export class MeterService {
  constructor(
    @InjectRepository(Meter)
    private readonly meterRepository: Repository<Meter>,
  ) {}

  async create(dto: CreateMeterDto): Promise<{
    data: Meter;
    status: boolean;
    message: string;
  }> {
    const entity = this.meterRepository.create({
      ...dto,
      property: { id: dto.propertyId } as Property,
    });
    const saved = await this.meterRepository.save(entity);

    return {
      data: saved,
      status: true,
      message: 'Registro exitoso',
    };
  }

  async findAll(query: PaginationQueryDto): Promise<{
    data: Meter[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.meterRepository.createQueryBuilder('meter');

    if (search) {
      qb.where(
        'meter.serialNumber ILIKE :search OR meter.model ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .orderBy('meter.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<Meter> {
    const subscriber = await this.meterRepository.findOne({
      where: { id },
    });
    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }
    return subscriber;
  }

  async update(id: string, updatePropertyDto: UpdateMeterDto): Promise<Meter> {
    const subscriber = await this.meterRepository.preload({
      id,
      ...updatePropertyDto,
    });

    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }

    return await this.meterRepository.save(subscriber);
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
