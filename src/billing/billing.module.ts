import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { BullModule } from '@nestjs/bull';
import { BillingProcessor } from './billing.processor';
import { PropertyModule } from 'src/property/property.module';
import { RatesModule } from 'src/rates/rates.module';
import { SubsidyContributionModule } from 'src/subsidy-contribution/subsidy-contribution.module';
import { ReadingSessionModule } from 'src/reading-session/reading-session.module';
import { InvoiceModule } from 'src/invoice/invoice.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'billing' }),
    PropertyModule,
    RatesModule,
    SubsidyContributionModule,
    InvoiceModule,
    ReadingSessionModule,
  ],
  controllers: [BillingController],
  providers: [BillingService, BillingProcessor],
})
export class BillingModule {}
