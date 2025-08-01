import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Department } from '../locations/entities/department.entity';
import { Municipality } from '../locations/entities/municipality.entity';

export const createDataSource = (configService: ConfigService) => {
  return new DataSource({
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USER'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [Department, Municipality],
    synchronize: true,
  });
};
