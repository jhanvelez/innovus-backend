import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InvoiceService } from 'src/invoice/invoice.service';

@Injectable()
export class BillingService {
  constructor(
    @InjectQueue('billing') private readonly billingQueue: Queue,
    private readonly invoiceService: InvoiceService,
  ) {}

  async findAll(cycleId: string, year: number, month: number) {
    return this.invoiceService.findAll(cycleId, year, month);
  }

  async enqueueBillingProcess(cycleId: string, year: number, month: number) {
    await this.billingQueue.add(
      'generateByCycle',
      {
        cycleId,
        year,
        month,
      },
      {
        removeOnComplete: true,
        attempts: 3,
      },
    );
  }
}
