import { PartialType } from '@nestjs/mapped-types';
import { CreateSubsidyContributionDto } from './create-subsidy-contribution.dto';

export class UpdateSubsidyContributionDto extends PartialType(CreateSubsidyContributionDto) {}
