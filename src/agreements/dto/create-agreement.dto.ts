import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateAgreementDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
