import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StratumController } from './stratum.controller';
import { StratumService } from './stratum.service';
import { Stratum } from './entities/stratum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stratum])],
  providers: [StratumService],
  controllers: [StratumController],
  exports: [StratumService],
})
export class StratumModule {}
