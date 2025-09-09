import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { RanksService } from './ranks.service';
import { CreateConsumptionRangeDto } from './dto/create-rank.dto';
import { UpdateConsumptionRangeDto } from './dto/update-rank.dto';

@Controller('consumption-ranges')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Post()
  create(@Body() dto: CreateConsumptionRangeDto) {
    return this.ranksService.create(dto);
  }

  @Get()
  findAll() {
    return this.ranksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ranksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConsumptionRangeDto) {
    return this.ranksService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ranksService.remove(+id);
  }
}
