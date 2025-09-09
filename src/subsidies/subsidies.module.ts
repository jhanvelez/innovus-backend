import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubsidiesService } from './subsidies.service';
import { SubsidiesController } from './subsidies.controller';
import { Subsidy } from './entities/subsidy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subsidy])],
  providers: [SubsidiesService],
  controllers: [SubsidiesController],
  exports: [SubsidiesService],
})
export class SubsidiesModule {}
