import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  create(@Body() dto: CreateRateDto) {
    return this.ratesService.create(dto);
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.ratesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRateDto) {
    return this.ratesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ratesService.remove(id);
  }

  @Put('state/:id')
  state(@Param('id') id: string, @Body() state: any) {
    return this.ratesService.state(id, state);
  }
}
