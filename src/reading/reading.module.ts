import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { Reading } from './entities/reading.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reading])],
  providers: [ReadingService],
  controllers: [ReadingController],
  exports: [ReadingService],
})
export class ReadingModule {}
