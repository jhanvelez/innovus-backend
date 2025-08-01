import { IsNumber, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  amount: number;

  @IsDateString()
  paymentDate: string;

  @IsString()
  paymentMethod: string;

  @IsString()
  reference: string;

  @IsOptional()
  @IsString()
  description?: string;
}
