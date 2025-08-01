import { Injectable } from '@nestjs/common';
import { CreatePredioDto } from './dto/create-predio.dto';
import { UpdatePredioDto } from './dto/update-predio.dto';

@Injectable()
export class PredioService {
  create(createPredioDto: CreatePredioDto) {
    return 'This action adds a new predio';
  }

  findAll() {
    return `This action returns all predio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} predio`;
  }

  update(id: number, updatePredioDto: UpdatePredioDto) {
    return `This action updates a #${id} predio`;
  }

  remove(id: number) {
    return `This action removes a #${id} predio`;
  }
}
