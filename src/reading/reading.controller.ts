import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { plainToInstance } from 'class-transformer';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ReadingService } from './reading.service';
import { CreateReadingDto } from './dto/create-reading.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: './uploads/evidence',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: any,
  ) {
    const transformed = this.transformFormData(body, files);
    const dto = plainToInstance(CreateReadingDto, transformed);
    return this.readingService.create(dto);
  }

  private transformFormData(body: any, files: Express.Multer.File[]) {
    const result: any = { ...body };

    const evidencePhoto = files.find((f) => f.fieldname === 'evidence.photo');
    if (body['evidence.value'] || evidencePhoto) {
      result.evidence = {
        value: body['evidence.value']
          ? Number(body['evidence.value'])
          : undefined,
        photo: evidencePhoto
          ? `/uploads/evidence/${evidencePhoto.filename}`
          : undefined,
      };
    }

    return result;
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.readingService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readingService.findOne(+id);
  }

  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadingDto: UpdateReadingDto) {
    return this.readingService.update(id, updateReadingDto);
  }
  */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readingService.remove(+id);
  }
}
