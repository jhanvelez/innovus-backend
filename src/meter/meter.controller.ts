import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MeterService } from './meter.service';
import { CreateMeterDto } from './dto/create-meter.dto';
import { UpdateMeterDto } from './dto/update-meter.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Query } from '@nestjs/common';

@Controller('meter')
export class MeterController {
  constructor(private readonly meterService: MeterService) {}

  @Post()
  create(@Body() createMeterDto: CreateMeterDto) {
    return this.meterService.create(createMeterDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.meterService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeterDto: UpdateMeterDto) {
    return this.meterService.update(id, updateMeterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meterService.remove(+id);
  }
}
