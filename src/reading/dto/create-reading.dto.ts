import { IsString, IsNumber, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateReadingDto {
  @IsString()
  cycle: string;

  @IsString()
  route: string;

  @IsString()
  photo: string;

  @IsNumber()
  reading: number;

  @IsNotEmpty()
  @IsUUID()
  meterId: string;
}
