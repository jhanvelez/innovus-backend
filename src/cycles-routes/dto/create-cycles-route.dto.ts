import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCyclesRouteDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
