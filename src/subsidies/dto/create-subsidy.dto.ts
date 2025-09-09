import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateSubsidyDto {
  @IsString()
  userType: string; // residential, commercial, industrial, official

  @IsNumber()
  stratum: number;

  @IsOptional()
  @IsNumber()
  subsidyPercent?: number;

  @IsOptional()
  @IsNumber()
  contributionPercent?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
