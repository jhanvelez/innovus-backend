import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadingSession } from './entities/reading-session.entity';
import { CreateReadingSessionDto } from './dto/create-reading-session.dto';
import { UpdateReadingSessionDto } from './dto/update-reading-session.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class ReadingSessionService {
  constructor(
    @InjectRepository(ReadingSession)
    private readonly readingSessionRepository: Repository<ReadingSession>,
  ) {}

  async create(createDto: CreateReadingSessionDto): Promise<ReadingSession> {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const existing = await this.readingSessionRepository.findOne({
      where: {
        month: currentMonth,
        year: currentYear,
        isActive: true,
      },
    });

    if (existing) {
      throw new BadRequestException(
        `Ya existe una sesión activa para ${currentMonth}/${currentYear}`,
      );
    }

    const session = this.readingSessionRepository.create({
      ...createDto,
      month: currentMonth,
      year: currentYear,
      isActive: true,
      startedAt: new Date(),
    });

    return this.readingSessionRepository.save(session);
  }

  async findAll(query: PaginationQueryDto): Promise<{
    data: ReadingSession[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.readingSessionRepository
      .createQueryBuilder('reading_sessions')
      .select([
        'reading_sessions.id',
        'reading_sessions.year',
        'reading_sessions.month',
        'reading_sessions.isActive',
        'reading_sessions.createdAt',
      ]);

    if (search) {
      qb.where('reading_sessions.year ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .orderBy('reading_sessions.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(year, month): Promise<ReadingSession> {
    const session = await this.readingSessionRepository.findOne({
      where: { year, month, isActive: true },
    });

    if (!session) {
      throw new NotFoundException(`Sesión con ID ${month} no encontrada`);
    }

    return session;
  }

  async getActiveSession(): Promise<ReadingSession> {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const session = await this.readingSessionRepository.findOne({
      where: {
        month: currentMonth,
        year: currentYear,
        isActive: true,
      },
    });

    if (!session) {
      throw new NotFoundException(
        `No hay sesión activa para ${currentMonth}/${currentYear}`,
      );
    }

    return session;
  }

  async closeSession(id: string): Promise<ReadingSession> {
    const session = await this.readingSessionRepository.findOne({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Sesión con ID ${id} no encontrada`);
    }

    if (!session.isActive) {
      throw new BadRequestException(`La sesión con ID ${id} ya está inactiva`);
    }

    session.isActive = false;
    session.endedAt = new Date();

    return this.readingSessionRepository.save(session);
  }

  async update(
    id: string,
    updateDto: UpdateReadingSessionDto,
  ): Promise<ReadingSession> {
    const session = await this.readingSessionRepository.findOne({
      where: { id },
    });

    if (!session) {
      throw new NotFoundException(`Sesión con ID ${id} no encontrada`);
    }

    Object.assign(session, updateDto);

    return this.readingSessionRepository.save(session);
  }
}
