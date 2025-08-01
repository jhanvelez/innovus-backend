import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  billingId: number;

  @IsString()
  number: string;

  @IsDateString()
  emissionDate: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsString()
  type: string;
}
