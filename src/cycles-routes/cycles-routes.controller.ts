import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CyclesRoutesService } from './cycles-routes.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('cycles-routes')
export class CyclesRoutesController {
  constructor(private readonly cyclesRoutesService: CyclesRoutesService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.cyclesRoutesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cyclesRoutesService.findOne(id);
  }

  @Post()
  create(@Body() dto: { name: string }) {
    return this.cyclesRoutesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: { name: string }) {
    return this.cyclesRoutesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() dto: { state: boolean }) {
    return this.cyclesRoutesService.remove(id, dto);
  }

  // --- Subrecurso: Rutas ---
  @Get(':cycleId/routes')
  findRoutes(@Param('cycleId') cycleId: string) {
    return this.cyclesRoutesService.findRoutes(cycleId);
  }

  @Post(':cycleId/routes')
  addRoute(
    @Param('cycleId') cycleId: string,
    @Body() dto: { name: string; order?: number },
  ) {
    return this.cyclesRoutesService.addRoute(cycleId, dto);
  }

  @Patch(':cycleId/routes/:routeId')
  updateRoute(
    @Param('cycleId') cycleId: string,
    @Param('routeId') routeId: string,
    @Body() dto: { name?: string; order?: number },
  ) {
    return this.cyclesRoutesService.updateRoute(cycleId, routeId, dto);
  }

  @Delete(':cycleId/routes/:routeId')
  removeRoute(
    @Param('cycleId') cycleId: string,
    @Param('routeId') routeId: string,
  ) {
    return this.cyclesRoutesService.removeRoute(cycleId, routeId);
  }
}
