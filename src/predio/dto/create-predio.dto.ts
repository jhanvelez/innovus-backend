import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePredioDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  fichaCatastral: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  direccion: string;
}
