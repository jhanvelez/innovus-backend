import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuscriptorService } from './suscriptor.service';
import { CreateSuscriptorDto } from './dto/create-suscriptor.dto';
import { UpdateSuscriptorDto } from './dto/update-suscriptor.dto';

@Controller('suscriptor')
export class SuscriptorController {
  constructor(private readonly suscriptorService: SuscriptorService) {}

  @Post()
  create(@Body() createSuscriptorDto: CreateSuscriptorDto) {
    return this.suscriptorService.create(createSuscriptorDto);
  }

  @Get()
  findAll() {
    return this.suscriptorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscriptorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuscriptorDto: UpdateSuscriptorDto) {
    return this.suscriptorService.update(+id, updateSuscriptorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscriptorService.remove(+id);
  }
}
