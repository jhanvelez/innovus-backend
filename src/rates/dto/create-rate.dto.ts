import { IsNumber, IsOptional, IsBoolean, IsUUID } from 'class-validator';

export class CreateRateDto {
  @IsNumber()
  fixedCharge: number;

  @IsOptional()
  @IsNumber()
  subsidyPercent?: number;

  @IsOptional()
  @IsNumber()
  contributionPercent?: number;

  @IsNumber()
  basic: number;

  @IsNumber()
  complementary: number;

  @IsNumber()
  sanctuary: number;

  @IsUUID()
  stratumId: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
