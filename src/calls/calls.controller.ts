import { Controller, Get } from '@nestjs/common';
import { CallsService } from './calls.service';

@Controller('calls')
export class CallsController {
  constructor(private readonly service: CallsService) {}

  @Get()
  getAllCalls() {
    return this.service.getAll();
  }
}
