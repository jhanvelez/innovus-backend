import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateReadingDto } from './dto/create-reading.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

import { Reading } from './entities/reading.entity';
import { Meter } from 'src/meter/entities/meter.entity';
import { ReadingEvidence } from './entities/readingevidence.entity';
import { ReadingCausal } from './entities/readingcausal.entity';
import { ReadingSession } from 'src/reading-session/entities/reading-session.entity';

export enum ReadingType {
  EVIDENCE = 'EVIDENCE',
  CAUSAL = 'CAUSAL',
}

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(ReadingSession)
    private readonly readingSessionRepository: Repository<ReadingSession>,
    @InjectRepository(Reading)
    private readonly readigRepository: Repository<Reading>,
    @InjectRepository(ReadingEvidence)
    private readonly readingEvidenceRepository: Repository<ReadingEvidence>,
    @InjectRepository(ReadingCausal)
    private readonly readingCausalRepository: Repository<ReadingCausal>,
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
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const activeSession = await this.readingSessionRepository.findOne({
      where: {
        year,
        month,
        isActive: true,
      },
    });

    if (!activeSession) {
      throw new BadRequestException(
        'No existe una sesión activa para el mes actual. Debes iniciar una sesión de lectura antes de registrar lecturas.',
      );
    }

    const reading = this.readigRepository.create({
      ...dto,
      type: dto.type as ReadingType,
      meter: { id: dto.meterId } as Meter,
      // se toma la sesión activa actual
      session: activeSession,
    });

    // Guardamos primero la lectura base
    const savedReading = await this.readigRepository.save(reading);

    if (dto.evidence) {
      const evidence = this.readingEvidenceRepository.create({
        ...dto.evidence,
        reading: savedReading,
      });
      await this.readingEvidenceRepository.save(evidence);
      savedReading.evidence = evidence;
    } else if (dto.causalId) {
      const causal = this.readingCausalRepository.create({
        causalId: dto.causalId,
        reading: savedReading,
      });
      await this.readingCausalRepository.save(causal);
      savedReading.causal = causal;
    }

    return {
      data: savedReading,
      status: true,
      message: 'Registro exitoso',
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} reading`;
  }

  remove(id: number) {
    return `This action removes a #${id} property`;
  }
}
