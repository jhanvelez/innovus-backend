import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadingSessionService } from './reading-session.service';
import { ReadingSessionController } from './reading-session.controller';
import { ReadingSession } from './entities/reading-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReadingSession])],
  providers: [ReadingSessionService],
  controllers: [ReadingSessionController],
  exports: [ReadingSessionService],
})
export class ReadingSessionModule {}
