import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  firstName: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  lastName: string;

  @IsNotEmpty({ message: 'El documento es obligatorio' })
  documentId: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;
}
