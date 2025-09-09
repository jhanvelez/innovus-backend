import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FinancingService } from './financing.service';
import { CreatePaymentPlanDto } from './dto/create-financing.dto';
import { UpdatePaymentPlanDto } from './dto/update-financing.dto';

@Controller('payment-plans')
export class FinancingController {
  constructor(private readonly financingService: FinancingService) {}

  @Post()
  create(@Body() dto: CreatePaymentPlanDto) {
    return this.financingService.create(dto);
  }

  @Get()
  findAll() {
    return this.financingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePaymentPlanDto) {
    return this.financingService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.financingService.remove(+id);
  }
}
