import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Repository } from 'typeorm';

import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Subscriber } from './entities/subscriber.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {}

  async findAll(query: PaginationQueryDto): Promise<{
    data: Subscriber[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.subscriberRepository.createQueryBuilder('subscriber');

    if (search) {
      qb.where(
        'subscriber.identificacion ILIKE :search OR subscriber.email ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .orderBy('subscriber.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async create(
    dto: CreateSubscriberDto,
    userId: string,
  ): Promise<{
    data: Subscriber;
    status: boolean;
    message: string;
  }> {
    const entity = this.subscriberRepository.create({
      ...dto,
      user: { id: Number(userId) } as User,
    });
    const saved = await this.subscriberRepository.save(entity);

    return {
      data: saved,
      status: true,
      message: 'Registro exitoso',
    };
  }

  async findOne(id: string): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.findOne({
      where: { id },
    });
    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }
    return subscriber;
  }

  async update(
    id: string,
    updateSubscriberDto: UpdateSubscriberDto,
  ): Promise<Subscriber> {
    const subscriber = await this.subscriberRepository.preload({
      id,
      ...updateSubscriberDto,
    });

    if (!subscriber) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }

    return await this.subscriberRepository.save(subscriber);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subscriberRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subscriber with ID ${id} not found`);
    }
  }
}
