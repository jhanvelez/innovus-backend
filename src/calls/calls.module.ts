import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { CallsController } from './calls.controller';
import { CallsService } from './calls.service';

@Module({
  imports: [TypeOrmModule.forFeature([Call])],
  providers: [CallsService],
  controllers: [CallsController],
  exports: [CallsService],
})
export class CallsModule {}
