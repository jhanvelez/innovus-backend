import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agreement } from './entities/agreement.entity';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';

@Injectable()
export class AgreementsService {
  constructor(
    @InjectRepository(Agreement)
    private readonly agreementRepo: Repository<Agreement>,
  ) {}

  async create(dto: CreateAgreementDto): Promise<Agreement> {
    const agreement = this.agreementRepo.create(dto);
    return this.agreementRepo.save(agreement);
  }

  findAll(): Promise<Agreement[]> {
    return this.agreementRepo.find();
  }

  async findOne(id: number): Promise<Agreement> {
    const agreement = await this.agreementRepo.findOne({ where: { id } });
    if (!agreement) throw new NotFoundException('Agreement not found');
    return agreement;
  }

  async update(id: number, dto: UpdateAgreementDto): Promise<Agreement> {
    const agreement = await this.findOne(id);
    Object.assign(agreement, dto);
    return this.agreementRepo.save(agreement);
  }

  async remove(id: number): Promise<void> {
    const agreement = await this.findOne(id);
    await this.agreementRepo.remove(agreement);
  }
}
