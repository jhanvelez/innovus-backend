// subsidy-contribution.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubsidyContribution } from './entities/subsidy-contribution.entity';
import { Stratum } from 'src/stratum/entities/stratum.entity';
import { SubsidyContributionService } from './subsidy-contribution.service';
import { SubsidyContributionController } from './subsidy-contribution.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubsidyContribution, Stratum])],
  providers: [SubsidyContributionService],
  controllers: [SubsidyContributionController],
  exports: [SubsidyContributionService],
})
export class SubsidyContributionModule {}
