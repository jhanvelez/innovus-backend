import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RanksService } from './ranks.service';
import { RanksController } from './ranks.controller';
import { ConsumptionRange } from './entities/rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionRange])],
  providers: [RanksService],
  controllers: [RanksController],
  exports: [RanksService],
})
export class RanksModule {}
