// subsidy-contribution.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { SubsidyContributionService } from './subsidy-contribution.service';
import { CreateSubsidyContributionDto } from './dto/create-subsidy-contribution.dto';
import { UpdateSubsidyContributionDto } from './dto/update-subsidy-contribution.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('subsidy-contributions')
export class SubsidyContributionController {
  constructor(private readonly service: SubsidyContributionService) {}

  @Post()
  create(@Body() dto: CreateSubsidyContributionDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.service.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubsidyContributionDto) {
    return this.service.update(id, dto);
  }

  @Put('state/:id')
  state(@Param('id') id: string, @Body() state: any) {
    return this.service.state(id, state);
  }

  @Get('by-stratum/:stratumId')
  findByStratum(@Param('stratumId') stratumId: string) {
    return this.service.findByStratum(stratumId);
  }
}
