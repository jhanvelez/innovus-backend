import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterService } from './meter.service';
import { MeterController } from './meter.controller';
import { Meter } from './entities/meter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meter])],
  providers: [MeterService],
  controllers: [MeterController],
  exports: [MeterService],
})
export class MeterModule {}
