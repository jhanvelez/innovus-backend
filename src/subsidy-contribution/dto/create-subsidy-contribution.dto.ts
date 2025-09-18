import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { SubsidyContributionType } from '../entities/subsidy-contribution.entity';

export class CreateSubsidyContributionDto {
  @IsUUID()
  stratumId: string;

  @IsEnum(SubsidyContributionType)
  type: SubsidyContributionType;

  @IsNumber()
  value: number;
}
