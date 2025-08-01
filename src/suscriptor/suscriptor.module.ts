import { Module } from '@nestjs/common';
import { SuscriptorService } from './suscriptor.service';
import { SuscriptorController } from './suscriptor.controller';

@Module({
  controllers: [SuscriptorController],
  providers: [SuscriptorService],
})
export class SuscriptorModule {}
