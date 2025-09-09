import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateConceptDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  type: string; // fixed | variable

  @IsOptional()
  @IsString()
  calculationBase?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
