import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancingService } from './financing.service';
import { FinancingController } from './financing.controller';
import { PaymentPlan } from './entities/payment-plan.entity';
import { Installment } from './entities/installment.entity';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';
import { Invoice } from 'src/invoice/entities/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentPlan, Installment, Subscriber, Invoice]),
  ],
  controllers: [FinancingController],
  providers: [FinancingService],
  exports: [FinancingService],
})
export class FinancingModule {}
