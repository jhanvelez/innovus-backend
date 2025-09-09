import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentPlanDto } from './create-financing.dto';

export class UpdatePaymentPlanDto extends PartialType(CreatePaymentPlanDto) {}
