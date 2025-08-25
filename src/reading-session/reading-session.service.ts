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

  async findAll(): Promise<ReadingSession[]> {
    return this.readingSessionRepository.find({
      order: { createdAt: 'DESC' },
    });
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
