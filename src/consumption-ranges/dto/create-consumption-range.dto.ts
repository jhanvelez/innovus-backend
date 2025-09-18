import { IsInt, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateConsumptionRangeDto {
  @IsInt()
  min: number;

  @IsInt()
  max: number;

  @IsString()
  type: string;

  @IsNumber()
  rate: number;

  @IsUUID()
  stratumId: string;
}
