import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

import { Property } from './entities/property.entity';
import { Subscriber } from '../subscriber/entities/subscriber.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propetyRepository: Repository<Property>,
  ) {}

  async findAll(query: PaginationQueryDto): Promise<{
    data: Property[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.propetyRepository.createQueryBuilder('property');

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

  async create(dto: CreatePropertyDto): Promise<{
    data: Property;
    status: boolean;
    message: string;
  }> {
    const entity = this.propetyRepository.create({
      ...dto,
      subscriber: { id: dto.subscriberId } as Subscriber,
    });
    const saved = await this.propetyRepository.save(entity);

    return {
      data: saved,
      status: true,
      message: 'Registro exitoso',
    };
  }

  async findOne(id: string): Promise<Property> {
    const subscriber = await this.propetyRepository.findOne({
      where: { id },
    });
    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }
    return subscriber;
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<Property> {
    const subscriber = await this.propetyRepository.preload({
      id,
      ...updatePropertyDto,
    });

    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }

    return await this.propetyRepository.save(subscriber);
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }

  async getAllWithMeters(): Promise<{
    data: Property[];
    status: boolean;
    message: string;
  }> {
    const data = await this.propetyRepository
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.meters', 'meter')
      .select([
        'property.id',
        'property.cadastralRecord',
        'property.address',
        'meter.id',
        'meter.serialNumber',
        'meter.brand',
        'meter.model',
        'meter.installationDate',
        'meter.purchaseDate',
      ])
      .orderBy('property.createdAt', 'DESC')
      .getMany();

    return {
      data,
      status: true,
      message: 'Properties with meters retrieved successfully',
    };
  }
}
