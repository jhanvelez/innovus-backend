import { IsString, IsNumber, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateMeterDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  diameter: number;

  @IsString()
  type: string;

  @IsDateString()
  installationDate: string;

  @IsString()
  installer: string;

  @IsString()
  provider: string;

  @IsDateString()
  purchaseDate: string;

  @IsNumber()
  value: number;
}
