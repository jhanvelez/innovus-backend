import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancingService } from './financing.service';
import { FinancingController } from './financing.controller';
import { PaymentPlan } from './entities/financing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlan])],
  providers: [FinancingService],
  controllers: [FinancingController],
  exports: [FinancingService],
})
export class FinancingModule {}
