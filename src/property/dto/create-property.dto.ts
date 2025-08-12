import { IsNotEmpty, IsString, MaxLength, IsUUID } from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  cadastralRecord: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;

  @IsNotEmpty()
  @IsUUID()
  subscriberId: string;
}
