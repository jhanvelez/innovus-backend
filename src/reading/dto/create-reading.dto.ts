import { IsDateString, IsString, IsNumber } from 'class-validator';

export class CreateReadingDto {
  @IsDateString()
  fechaLectura: string;

  @IsString()
  ciclo: string;

  @IsString()
  ruta: string;

  @IsNumber()
  lecturaAnterior: number;

  @IsNumber()
  lecturaActual: number;

  @IsNumber()
  consumoPeriodo: number;

  @IsString()
  lector: string;

  @IsNumber()
  medidorId: number;

  @IsNumber()
  suscriptorId: number;
}
