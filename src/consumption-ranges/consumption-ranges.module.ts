import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionRangesService } from './consumption-ranges.service';
import { ConsumptionRangesController } from './consumption-ranges.controller';
import { ConsumptionRange } from './entities/consumption-range.entity';
import { Stratum } from 'src/stratum/entities/stratum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionRange, Stratum])],
  providers: [ConsumptionRangesService],
  controllers: [ConsumptionRangesController],
  exports: [ConsumptionRangesService],
})
export class ConsumptionRangesModule {}
