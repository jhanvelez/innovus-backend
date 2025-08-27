import { PartialType } from '@nestjs/mapped-types';
import { CreateCyclesRouteDto } from './create-cycles-route.dto';

export class UpdateCyclesRouteDto extends PartialType(CreateCyclesRouteDto) {}
