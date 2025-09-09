import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConceptsService } from './concepts.service';
import { ConceptsController } from './concepts.controller';
import { Concept } from './entities/concept.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Concept])],
  providers: [ConceptsService],
  controllers: [ConceptsController],
  exports: [ConceptsService],
})
export class ConceptsModule {}
