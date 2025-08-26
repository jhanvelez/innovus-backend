import { IsString, IsNotEmpty, IsUUID, ValidateIf } from 'class-validator';

export class CreateReadingDto {
  @IsString()
  cycle: string;

  @IsString()
  route: string;

  @IsNotEmpty()
  @IsUUID()
  meterId: string;

  // Tipo de lectura que condicionará los valores requeridos
  @IsString()
  @IsNotEmpty()
  type: string;

  // Evidencia (solo requerida si type === 'evidence')
  @ValidateIf((o) => o.type === 'EVIDENCE')
  @IsNotEmpty()
  evidence: {
    IsString();
    photo: string;

    IsNumber();
    value: number;
  };

  // Causal (solo requerida si type === 'causal')
  @ValidateIf((o) => o.type === 'CAUSAL')
  @IsUUID()
  @IsNotEmpty()
  causalId: string;
}
