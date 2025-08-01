import { Injectable } from '@nestjs/common';
import { CreateSuscriptorDto } from './dto/create-suscriptor.dto';
import { UpdateSuscriptorDto } from './dto/update-suscriptor.dto';

@Injectable()
export class SuscriptorService {
  create(createSuscriptorDto: CreateSuscriptorDto) {
    return 'This action adds a new suscriptor';
  }

  findAll() {
    return `This action returns all suscriptor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suscriptor`;
  }

  update(id: number, updateSuscriptorDto: UpdateSuscriptorDto) {
    return `This action updates a #${id} suscriptor`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscriptor`;
  }
}
