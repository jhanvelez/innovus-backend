// subsidy-contribution.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubsidyContribution } from './entities/subsidy-contribution.entity';
import { CreateSubsidyContributionDto } from './dto/create-subsidy-contribution.dto';
import { UpdateSubsidyContributionDto } from './dto/update-subsidy-contribution.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Stratum } from 'src/stratum/entities/stratum.entity';

@Injectable()
export class SubsidyContributionService {
  constructor(
    @InjectRepository(SubsidyContribution)
    private readonly repo: Repository<SubsidyContribution>,
    @InjectRepository(Stratum)
    private readonly stratumRepo: Repository<Stratum>,
  ) {}

  async create(dto: CreateSubsidyContributionDto) {
    const stratum = await this.stratumRepo.findOne({
      where: { id: dto.stratumId },
    });
    if (!stratum) throw new NotFoundException('Estrato no encontrado');

    const existing = await this.repo.findOne({
      where: { stratum: { id: dto.stratumId }, type: dto.type, active: true },
    });
    if (existing) {
      throw new ConflictException(`Ya existe un ${dto.type} para este estrato`);
    }

    const entity = this.repo.create({ ...dto, stratum });
    return this.repo.save(entity);
  }

  async findAll(query: PaginationQueryDto): Promise<{
    data: SubsidyContribution[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.repo
      .createQueryBuilder('subsidy_contribution')
      .leftJoin('subsidy_contribution.stratum', 'stratum')
      .select([
        'subsidy_contribution.id',
        'subsidy_contribution.type',
        'subsidy_contribution.value',
        'subsidy_contribution.active',
        'subsidy_contribution.createdAt',
        'stratum.id',
        'stratum.name',
      ]);

    if (search) {
      qb.where(
        'subsidy_contribution.year ILIKE :search OR subsidy_contribution.month ILIKE :search',
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

  async findOne(id: string) {
    const sc = await this.repo.findOne({ where: { id } });
    if (!sc) throw new NotFoundException('Registro no encontrado');
    return sc;
  }

  async update(id: string, dto: UpdateSubsidyContributionDto) {
    const sc = await this.findOne(id);

    if (dto.stratumId) {
      const stratum = await this.stratumRepo.findOne({
        where: { id: dto.stratumId },
      });
      if (!stratum) throw new NotFoundException('Estrato no encontrado');
      sc.stratum = stratum;
    }

    Object.assign(sc, dto);
    return this.repo.save(sc);
  }

  async remove(id: string) {
    const sc = await this.findOne(id);
    return this.repo.remove(sc);
  }

  async findByStratum(stratumId: string) {
    return this.repo.find({
      where: { stratum: { id: stratumId } },
    });
  }

  async state(id: string, dto: any): Promise<void> {
    const tariff = await this.findOne(id);

    const tariffRe = await this.repo.find({
      where: {
        stratum: tariff.stratum,
        active: true,
      },
    });

    if (dto.state) {
      if (tariffRe.length > 1) {
        if (tariffRe) {
          throw new ConflictException(
            `Ya existe un subsidio activa para el estrato, inactívalo para un nuevo registro.`,
          );
        }
      }
    }

    Object.assign(tariff, {
      active: !dto.state,
    });

    await this.repo.save(tariff);
  }

  async findActiveSubsidies(): Promise<SubsidyContribution[]> {
    return this.repo.find({ where: { active: true } });
  }
}
