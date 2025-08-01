import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Call } from './entities/call.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(Call)
    private readonly repo: Repository<Call>,
  ) {}

  async getAll() {
    return await this.repo.find();
  }
}
