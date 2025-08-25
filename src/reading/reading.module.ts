import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { Reading } from './entities/reading.entity';
import { ReadingCausal } from './entities/readingcausal.entity';
import { ReadingEvidence } from './entities/readingevidence.entity';
import { ReadingSession } from 'src/reading-session/entities/reading-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reading,
      ReadingCausal,
      ReadingEvidence,
      ReadingSession,
    ]),
  ],
  providers: [ReadingService],
  controllers: [ReadingController],
  exports: [ReadingService],
})
export class ReadingModule {}
