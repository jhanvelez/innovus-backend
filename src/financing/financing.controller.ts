import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { FinancingService } from './financing.service';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';

@Controller('financing')
export class FinancingController {
  constructor(private readonly financingService: FinancingService) {}

  // Crear plan de financiación para un medidor (a través de su factura)
  @Post()
  createPlan(@Body() dto: CreatePaymentPlanDto) {
    return this.financingService.createPlan(dto);
  }

  // Ver un plan con todas sus cuotas
  @Get(':id')
  getPlan(@Param('id') id: string) {
    return this.financingService.getPlan(id);
  }

  // Ver planes de un medidor específico
  @Get('meter/:meterId')
  getPlansByMeter(@Param('meterId') meterId: string) {
    return this.financingService.getPlansByMeter(meterId);
  }

  // Listar cuotas de un plan
  @Get(':id/installments')
  getInstallments(@Param('id') id: string) {
    return this.financingService.getInstallments(id);
  }

  // Cancelar un plan
  @Patch(':id/cancel')
  cancelPlan(@Param('id') id: string) {
    return this.financingService.cancelPlan(id);
  }
}
