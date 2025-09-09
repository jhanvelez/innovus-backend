import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePaymentPlanDto {
  @IsNumber()
  customerId: number;

  @IsNumber()
  invoiceId: number;

  @IsNumber()
  financedAmount: number;

  @IsNumber()
  installments: number;

  @IsOptional()
  @IsNumber()
  interestRate?: number;

  @IsOptional()
  @IsNumber()
  installmentValue?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
