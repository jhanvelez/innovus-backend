import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserFilterDto } from './dto/user-filter.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(filter?: UserFilterDto): Promise<User[]> {
    if (filter?.search) {
      return this.usersRepository.find({
        where: [
          { email: Like(`%${filter.search}%`) },
          { firstName: Like(`%${filter.search}%`) },
          { lastName: Like(`%${filter.search}%`) },
          { documentId: Like(`%${filter.search}%`) },
        ],
      });
    }
    return this.usersRepository.find();
  }

  async create(userData: Partial<User>): Promise<User> {
    if (!userData.password) {
      throw new BadRequestException('Password is required');
    }
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = this.usersRepository.create({
        ...userData,
        password: hashedPassword,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      // Error de duplicidad (Postgres)
      if (error.code === '23505') {
        throw new ConflictException('Email or documentId already exists');
      }
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
}
