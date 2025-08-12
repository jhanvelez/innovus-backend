import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';

export class CreateSubscriberDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  identification: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  category: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nameOwner: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address: string;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  phone?: string;

  @IsEmail()
  @IsOptional()
  @Length(0, 100)
  email?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  cycle: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  route: string;
}
