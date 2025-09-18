import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConsumptionRange } from './entities/consumption-range.entity';
import { CreateConsumptionRangeDto } from './dto/create-consumption-range.dto';
import { UpdateConsumptionRangeDto } from './dto/update-consumption-range.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Stratum } from 'src/stratum/entities/stratum.entity';

@Injectable()
export class ConsumptionRangesService {
  constructor(
    @InjectRepository(ConsumptionRange)
    private readonly rangeRepo: Repository<ConsumptionRange>,
    @InjectRepository(Stratum)
    private readonly stratumRepo: Repository<Stratum>,
  ) {}

  async create(dto: CreateConsumptionRangeDto) {
    const stratum = await this.stratumRepo.findOneBy({ id: dto.stratumId });
    const range = this.rangeRepo.create({ ...dto, stratum });
    return this.rangeRepo.save(range);
  }

  async findAll(query: PaginationQueryDto): Promise<{
    data: ConsumptionRange[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.rangeRepo
      .createQueryBuilder('consumption_range')
      .leftJoin('consumption_range.stratum', 'stratum')
      .select([
        'consumption_range.id',
        'consumption_range.min',
        'consumption_range.max',
        'consumption_range.type',
        'consumption_range.rate',
        'consumption_range.active',
        'consumption_range.createdAt',
        'stratum.id',
        'stratum.name',
      ]);

    if (search) {
      qb.where(
        'consumption_range.year ILIKE :search OR consumption_range.month ILIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .orderBy('stratum.id', 'ASC')
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: string) {
    return this.rangeRepo.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateConsumptionRangeDto) {
    await this.rangeRepo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.rangeRepo.delete(id);
  }
}
