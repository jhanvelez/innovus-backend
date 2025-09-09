import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SubsidiesService } from './subsidies.service';
import { CreateSubsidyDto } from './dto/create-subsidy.dto';
import { UpdateSubsidyDto } from './dto/update-subsidy.dto';

@Controller('subsidies')
export class SubsidiesController {
  constructor(private readonly subsidiesService: SubsidiesService) {}

  @Post()
  create(@Body() dto: CreateSubsidyDto) {
    return this.subsidiesService.create(dto);
  }

  @Get()
  findAll() {
    return this.subsidiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subsidiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubsidyDto) {
    return this.subsidiesService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subsidiesService.remove(+id);
  }
}
