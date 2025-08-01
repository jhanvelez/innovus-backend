import { Module } from '@nestjs/common';
import { PredioService } from './predio.service';
import { PredioController } from './predio.controller';

@Module({
  controllers: [PredioController],
  providers: [PredioService],
})
export class PredioModule {}
