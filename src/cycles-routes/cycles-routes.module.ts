import { Module } from '@nestjs/common';
import { CyclesRoutesService } from './cycles-routes.service';
import { CyclesRoutesController } from './cycles-routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './entities/cycle.entity';
import { Route } from './entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cycle, Route])],
  providers: [CyclesRoutesService],
  controllers: [CyclesRoutesController],
  exports: [CyclesRoutesService],
})
export class CyclesRoutesModule {}
