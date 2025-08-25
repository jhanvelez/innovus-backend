import {
  IsString,
  IsOptional,
  IsEmail,
  Length,
  IsInt,
  IsDate,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTenantDto {
  @IsString()
  @Length(3, 100)
  fullName: string;

  @IsInt()
  @Min(1, { message: 'El valor mínimo permitido es 1' })
  @Max(9999999999, { message: 'El valor máximo permitido es 9999999999' })
  identification: number;

  @IsDate()
  @Type(() => Date)
  serviceStartDate: Date;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
