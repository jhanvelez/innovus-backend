import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsUUID,
  Length,
} from 'class-validator';

export class CreatePropertyDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  cadastralRecord: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  cycle: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  route: string;

  @IsNotEmpty()
  @IsUUID()
  subscriberId: string;

  @IsNotEmpty()
  @IsUUID()
  tenantId: string;
}
