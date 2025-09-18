import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ConsumptionRangesService } from './consumption-ranges.service';
import { CreateConsumptionRangeDto } from './dto/create-consumption-range.dto';
import { UpdateConsumptionRangeDto } from './dto/update-consumption-range.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('consumption-ranges')
export class ConsumptionRangesController {
  constructor(private readonly service: ConsumptionRangesService) {}

  @Post()
  create(@Body() dto: CreateConsumptionRangeDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateConsumptionRangeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
