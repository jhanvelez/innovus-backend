import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PredioService } from './predio.service';
import { CreatePredioDto } from './dto/create-predio.dto';
import { UpdatePredioDto } from './dto/update-predio.dto';

@Controller('predio')
export class PredioController {
  constructor(private readonly predioService: PredioService) {}

  @Post()
  create(@Body() createPredioDto: CreatePredioDto) {
    return this.predioService.create(createPredioDto);
  }

  @Get()
  findAll() {
    return this.predioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePredioDto: UpdatePredioDto) {
    return this.predioService.update(+id, updatePredioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predioService.remove(+id);
  }
}
