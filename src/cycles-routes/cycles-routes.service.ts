import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from './entities/cycle.entity';
import { Route } from './entities/route.entity';
import { CreateCyclesRouteDto } from './dto/create-cycles-route.dto';
import { UpdateCyclesRouteDto } from './dto/update-cycles-route.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class CyclesRoutesService {
  constructor(
    @InjectRepository(Cycle)
    private readonly cycleRepo: Repository<Cycle>,

    @InjectRepository(Route)
    private readonly routeRepo: Repository<Route>,
  ) {}

  // ----------------- CICLOS -----------------
  async create(createDto: CreateCyclesRouteDto) {
    const cycle = this.cycleRepo.create({ name: createDto.name });
    return this.cycleRepo.save(cycle);
  }

  async findAll(query: PaginationQueryDto): Promise<{
    data: Cycle[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    //return this.cycleRepo.find({ relations: ['routes'] });

    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    const qb = this.cycleRepo
      .createQueryBuilder('cycle')
      .leftJoin('cycle.routes', 'routes')
      .select([
        'cycle.id',
        'cycle.name',
        'cycle.isActive',
        'cycle.createdAt',
        'routes.id',
        'routes.name',
      ]);

    if (search) {
      qb.where('cycle.name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [data, total] = await qb
      .skip(skip)
      .take(limit)
      .orderBy('cycle.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const cycle = await this.cycleRepo.findOne({
      where: { id },
      relations: ['routes'],
    });
    if (!cycle) throw new NotFoundException(`Cycle ${id} not found`);
    return cycle;
  }

  async update(id: string, updateDto: UpdateCyclesRouteDto) {
    const cycle = await this.findOne(id);
    Object.assign(cycle, updateDto);
    return this.cycleRepo.save(cycle);
  }

  async remove(id: string, updateDto: { state: boolean }) {
    const cycle = await this.findOne(id);

    Object.assign(cycle, {
      isActive: updateDto.state,
    });
    return this.cycleRepo.save(cycle);
    //return this.cycleRepo.remove(cycle);
  }

  // ----------------- RUTAS -----------------
  async findRoutes(cycleId: string) {
    const cycle = await this.findOne(cycleId);
    return cycle.routes;
  }

  async addRoute(cycleId: string, dto: { name: string; order?: number }) {
    const cycle = await this.findOne(cycleId);
    const route = this.routeRepo.create({
      name: dto.name,
      order: dto.order ?? 0,
      cycle,
    });
    return this.routeRepo.save(route);
  }

  async updateRoute(
    cycleId: string,
    routeId: string,
    dto: { name?: string; order?: number },
  ) {
    const route = await this.routeRepo.findOne({
      where: { id: routeId, cycle: { id: cycleId } },
      relations: ['cycle'],
    });
    if (!route)
      throw new NotFoundException(
        `Route ${routeId} not found in Cycle ${cycleId}`,
      );

    Object.assign(route, dto);
    return this.routeRepo.save(route);
  }

  async removeRoute(cycleId: string, routeId: string) {
    const route = await this.routeRepo.findOne({
      where: { id: routeId, cycle: { id: cycleId } },
      relations: ['cycle'],
    });
    if (!route)
      throw new NotFoundException(
        `Route ${routeId} not found in Cycle ${cycleId}`,
      );

    return this.routeRepo.remove(route);
  }
}
