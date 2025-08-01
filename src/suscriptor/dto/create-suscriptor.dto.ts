import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateSuscriptorDto {
  @IsString()
  @IsNotEmpty()
  identificacion: string;

  @IsDateString()
  @IsNotEmpty()
  fechaSuscripcion: string;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsNotEmpty()
  nombrePropietario: string;

  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  tel: string;

  @IsString()
  @IsNotEmpty()
  correoElectronico: string;

  @IsString()
  @IsNotEmpty()
  medidor: string;

  @IsString()
  @IsNotEmpty()
  ciclo: string;

  @IsString()
  @IsNotEmpty()
  ruta: string;

  @IsNotEmpty()
  predioId: number;
}
