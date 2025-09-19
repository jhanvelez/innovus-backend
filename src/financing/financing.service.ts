import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';
import { Installment } from './entities/installment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Injectable()
export class FinancingService {
  constructor(
    @InjectRepository(PaymentPlan)
    private readonly planRepo: Repository<PaymentPlan>,
    @InjectRepository(Installment)
    private readonly installmentRepo: Repository<Installment>,
    @InjectRepository(Subscriber)
    private readonly subscriberRepo: Repository<Subscriber>,
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {}

  async createPlan(dto: CreatePaymentPlanDto) {
    const subscriber = await this.subscriberRepo.findOne({
      where: { id: dto.subscriberId },
    });
    if (!subscriber) throw new NotFoundException('Subscriber not found');

    const invoice = await this.invoiceRepo.findOne({
      where: { id: dto.invoiceId },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');

    // Calcular valor de cuota
    const installmentValue = dto.financedAmount / dto.installments;

    const plan = this.planRepo.create({
      subscriber,
      invoice,
      financedAmount: dto.financedAmount,
      installments: dto.installments,
      interestRate: dto.interestRate,
      installmentValue,
      status: 'active',
    });

    await this.planRepo.save(plan);

    // Crear cuotas
    const installments = [];
    for (let i = 1; i <= dto.installments; i++) {
      const installment = this.installmentRepo.create({
        plan,
        installmentNumber: i,
        dueDate: this.addMonths(new Date(), i), // cada mes
        amount: installmentValue,
        status: 'PENDING',
      });
      installments.push(installment);
    }

    await this.installmentRepo.save(installments);

    return { plan, installments };
  }

  async getPlan(id: string) {
    return this.planRepo.findOne({
      where: { id },
      relations: ['subscriber', 'invoice', 'installmentsList'],
    });
  }

  async getPlansByMeter(meterId: string) {
    // buscar facturas relacionadas al medidor
    return this.planRepo.find({
      where: { invoice: { meter: { id: meterId } } },
      relations: ['subscriber', 'invoice', 'installmentsList'],
    });
  }

  async getInstallments(planId: string) {
    return this.installmentRepo.find({
      where: { plan: { id: planId } },
      order: { installmentNumber: 'ASC' },
    });
  }

  async cancelPlan(id: string) {
    const plan = await this.planRepo.findOne({ where: { id } });
    if (!plan) throw new NotFoundException('Plan not found');
    plan.status = 'cancelled';
    return this.planRepo.save(plan);
  }

  private addMonths(date: Date, months: number) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
  }
}
