export class CreateRankDto {}
import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateConsumptionRangeDto {
  @IsString()
  name: string;

  @IsNumber()
  minValue: number;

  @IsNumber()
  maxValue: number;

  @IsNumber()
  rate: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
