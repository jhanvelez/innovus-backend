import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptionRangeDto } from './create-rank.dto';

export class UpdateConsumptionRangeDto extends PartialType(
  CreateConsumptionRangeDto,
) {}
