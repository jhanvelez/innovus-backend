import { PartialType } from '@nestjs/mapped-types';
import { CreateBillingConceptDto } from './create-billing-concept.dto';

export class UpdateBillingConceptDto extends PartialType(CreateBillingConceptDto) {}
