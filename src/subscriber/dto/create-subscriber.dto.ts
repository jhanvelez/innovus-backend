import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateIf,
  Length,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateSubscriberDto {
  @IsInt({ message: 'El valor debe ser un número entero' })
  @Min(1, { message: 'El valor mínimo permitido es 1' })
  @Max(999999999, { message: 'El valor máximo permitido es 10' })
  identification: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nameOwner: string;

  @IsString()
  @IsOptional()
  @Length(0, 20)
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  category: string;

  @ValidateIf((o) => o.category === 'residencial')
  @IsNotEmpty({ message: 'stratumId es requerido para categoría residencial' })
  stratumId: string;
}
