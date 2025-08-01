import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillingConceptService } from './billing-concept.service';
import { CreateBillingConceptDto } from './dto/create-billing-concept.dto';
import { UpdateBillingConceptDto } from './dto/update-billing-concept.dto';

@Controller('billing-concept')
export class BillingConceptController {
  constructor(private readonly billingConceptService: BillingConceptService) {}

  @Post()
  create(@Body() createBillingConceptDto: CreateBillingConceptDto) {
    return this.billingConceptService.create(createBillingConceptDto);
  }

  @Get()
  findAll() {
    return this.billingConceptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billingConceptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillingConceptDto: UpdateBillingConceptDto) {
    return this.billingConceptService.update(+id, updateBillingConceptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billingConceptService.remove(+id);
  }
}
