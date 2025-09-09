import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Concept } from './entities/concept.entity';
import { CreateConceptDto } from './dto/create-concept.dto';
import { UpdateConceptDto } from './dto/update-concept.dto';

@Injectable()
export class ConceptsService {
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepo: Repository<Concept>,
  ) {}

  async create(dto: CreateConceptDto): Promise<Concept> {
    const concept = this.conceptRepo.create(dto);
    return this.conceptRepo.save(concept);
  }

  findAll(): Promise<Concept[]> {
    return this.conceptRepo.find();
  }

  async findOne(id: number): Promise<Concept> {
    const concept = await this.conceptRepo.findOne({ where: { id } });
    if (!concept) throw new NotFoundException('Concept not found');
    return concept;
  }

  async update(id: number, dto: UpdateConceptDto): Promise<Concept> {
    const concept = await this.findOne(id);
    Object.assign(concept, dto);
    return this.conceptRepo.save(concept);
  }

  async remove(id: number): Promise<void> {
    const concept = await this.findOne(id);
    await this.conceptRepo.remove(concept);
  }
}
