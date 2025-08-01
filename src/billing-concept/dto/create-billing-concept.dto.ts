import { IsString, IsNumber } from 'class-validator';

export class CreateBillingConceptDto {
  @IsNumber()
  billingId: number;

  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  unitValue: number;

  @IsNumber()
  quantity: number;

  @IsString()
  type: string;
}
