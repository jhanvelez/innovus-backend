import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  period: string;

  @IsNumber()
  daysCount: number;

  @IsNumber()
  totalValue: number;

  @IsNumber()
  subscriberId: string;

  @IsNumber()
  meterId: number;

  @IsNumber()
  readingId: number;

  @IsOptional()
  concepts?: any;
}
