import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ReadingSessionService } from './reading-session.service';
import { CreateReadingSessionDto } from './dto/create-reading-session.dto';
import { UpdateReadingSessionDto } from './dto/update-reading-session.dto';

@Controller('reading-sessions')
export class ReadingSessionController {
  constructor(private readonly readingSessionService: ReadingSessionService) {}

  @Post()
  create(@Body() createReadingSessionDto: CreateReadingSessionDto) {
    return this.readingSessionService.create(createReadingSessionDto);
  }

  @Get()
  findAll() {
    return this.readingSessionService.findAll();
  }

  @Get('active')
  getActiveSession() {
    return this.readingSessionService.getActiveSession();
  }

  @Patch(':id/close')
  closeSession(@Param('id') id: string) {
    return this.readingSessionService.closeSession(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReadingSessionDto: UpdateReadingSessionDto,
  ) {
    return this.readingSessionService.update(id, updateReadingSessionDto);
  }
}
