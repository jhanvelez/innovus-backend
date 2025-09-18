// billing.controller.ts
import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { BillingService } from './billing.service';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // Obtener facturación por periodo y ciclo
  @Get(':cycleId')
  async findAll(
    @Param('cycleId') cycleId: string,
    @Body() body: { month: number; year: number },
  ) {
    return await this.billingService.findAll(cycleId, body.year, body.month);
  }

  @Post('generate/cycle/:cycleId')
  async generateByCycle(
    @Param('cycleId') cycleId: string,
    @Body() body: { month: number; year: number },
  ) {
    await this.billingService.enqueueBillingProcess(
      cycleId,
      body.year,
      body.month,
    );
    return {
      message: `Proceso de facturación iniciado para ciclo ${cycleId}. 
      Recibirás una notificación cuando termine.`,
    };
  }
}
