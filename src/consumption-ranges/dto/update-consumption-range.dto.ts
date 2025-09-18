import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptionRangeDto } from './create-consumption-range.dto';

export class UpdateConsumptionRangeDto extends PartialType(CreateConsumptionRangeDto) {}
