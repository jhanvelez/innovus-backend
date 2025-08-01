import { Module } from '@nestjs/common';
import { BillingConceptService } from './billing-concept.service';
import { BillingConceptController } from './billing-concept.controller';

@Module({
  controllers: [BillingConceptController],
  providers: [BillingConceptService],
})
export class BillingConceptModule {}
