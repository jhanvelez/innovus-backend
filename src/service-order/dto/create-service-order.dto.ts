import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateServiceOrderDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  meterId: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;
}
