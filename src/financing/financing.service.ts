import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentPlan } from './entities/financing.entity';
import { CreatePaymentPlanDto } from './dto/create-financing.dto';
import { UpdatePaymentPlanDto } from './dto/update-financing.dto';

@Injectable()
export class FinancingService {
  constructor(
    @InjectRepository(PaymentPlan)
    private readonly planRepo: Repository<PaymentPlan>,
  ) {}

  async create(dto: CreatePaymentPlanDto): Promise<PaymentPlan> {
    const plan = this.planRepo.create(dto);
    return this.planRepo.save(plan);
  }

  findAll(): Promise<PaymentPlan[]> {
    return this.planRepo.find();
  }

  async findOne(id: number): Promise<PaymentPlan> {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException('Payment plan not found');
    return plan;
  }

  async update(id: number, dto: UpdatePaymentPlanDto): Promise<PaymentPlan> {
    const plan = await this.findOne(id);
    Object.assign(plan, dto);
    return this.planRepo.save(plan);
  }

  async remove(id: number): Promise<void> {
    const plan = await this.findOne(id);
    await this.planRepo.remove(plan);
  }
}
