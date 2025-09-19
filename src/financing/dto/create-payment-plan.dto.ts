import { IsUUID, IsNumber, IsInt } from 'class-validator';

export class CreatePaymentPlanDto {
  @IsUUID()
  subscriberId: string;

  @IsUUID()
  invoiceId: string;

  @IsNumber()
  financedAmount: number;

  @IsInt()
  installments: number;

  @IsNumber()
  interestRate: number; // %
}
