import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from './entities/rate.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Stratum } from 'src/stratum/entities/stratum.entity';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private readonly tariffRepo: Repository<Rate>,
  ) {}

  async create(dto: CreateRateDto): Promise<Rate> {
    const fechaActual = new Date();

    const tariffRe = await this.tariffRepo.findOne({
      where: {
        stratum: { id: dto.stratumId } as Stratum,
        active: true,
      },
    });

    if (tariffRe) {
      throw new ConflictException(
        `Ya existe una tarifa activa para el estrato, inactívalo para un nuevo registro.`,
      );
    }

    const tariff = this.tariffRepo.create({
      ...dto,
      year: fechaActual.getFullYear(),
      month: fechaActual.getMonth() + 1,
      stratum: { id: dto.stratumId } as Stratum,
    });
    return this.tariffRepo.save(tariff);
  }

  async findAll(query: PaginationQueryDto): Promise<{
    data: Rate[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.tariffRepo
      .createQueryBuilder('rates')
      .leftJoin('rates.stratum', 'stratum')
      .select([
        'rates.id',
        'rates.subsidyPercent',
        'rates.contributionPercent',
        'rates.fixedCharge',
        'rates.basic',
        'rates.complementary',
        'rates.sanctuary',
        'rates.year',
        'rates.month',
        'rates.active',
        'rates.createdAt',
        'stratum.id',
        'stratum.name',
      ]);

    if (search) {
      qb.where('rates.year ILIKE :search OR rates.month ILIKE :search', {
        search: `%${search}%`,
      });
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

  async findOne(id: string): Promise<Rate> {
    const tariff = await this.tariffRepo.findOne({ where: { id } });
    if (!tariff) throw new NotFoundException('Tariff not found');
    return tariff;
  }

  async update(id: string, dto: UpdateRateDto): Promise<Rate> {
    const tariff = await this.findOne(id);
    Object.assign(tariff, dto);
    return this.tariffRepo.save(tariff);
  }

  async remove(id: string): Promise<void> {
    const tariff = await this.findOne(id);
    await this.tariffRepo.remove(tariff);
  }

  async state(id: string, dto: any): Promise<void> {
    const tariff = await this.findOne(id);

    const tariffRe = await this.tariffRepo.find({
      where: {
        stratum: tariff.stratum,
        active: true,
      },
    });

    if (dto.state) {
      if (tariffRe.length > 1) {
        if (tariffRe) {
          throw new ConflictException(
            `Ya existe una tarifa activa para el estrato, inactívalo para un nuevo registro.`,
          );
        }
      }
    }

    Object.assign(tariff, {
      active: !dto.state,
    });

    await this.tariffRepo.save(tariff);
  }

  async findActiveRates(): Promise<Rate[]> {
    return this.tariffRepo.find({
      where: { active: true },
      relations: ['stratum'],
    });
  }
}
