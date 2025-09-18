import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Meter } from 'src/meter/entities/meter.entity';
import { ReadingSession } from 'src/reading-session/entities/reading-session.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {}

  async createInvoice(
    meter: Meter,
    session: ReadingSession,
    year: number,
    month: number,
    consumption: number,
    valueBeforeAdjustments: number,
    valueAfterAdjustments: number,
    fixedCharge: number,
  ) {
    const invoice = this.invoiceRepo.create({
      meter,
      readingSession: session,
      year,
      month,
      consumption,
      valueBeforeAdjustments,
      valueAfterAdjustments,
      fixedCharge,
      status: InvoiceStatus.PENDING,
    });

    return this.invoiceRepo.save(invoice);
  }

  async findBySession(sessionId: string) {
    return this.invoiceRepo.find({
      where: { readingSession: { id: sessionId } },
    });
  }

  async findAll(cycleId: string, year: number, month: number) {
    return this.invoiceRepo.find({
      where: {
        property: { cycle: { id: cycleId } }, // filtra por ciclo
        readingSession: { year, month }, // filtra por periodo
      },
      relations: {
        property: {
          subscriber: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
  }
}
