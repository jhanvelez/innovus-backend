import { Controller, Get, Param } from '@nestjs/common';
import { StratumService } from './stratum.service';

@Controller('stratum')
export class StratumController {
  constructor(private readonly strataService: StratumService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.strataService.findOne(id);
  }

  @Get()
  findAll() {
    return this.strataService.findAll();
  }
}
