import { config } from 'dotenv';
config();

import { ConfigService } from '@nestjs/config';
import { createDataSource } from '../config/typeorm.config';
import seedDepartments from './seeders/department.seeder';
import seedMunicipalities from './seeders/municipality.seeder';

const args = process.argv.slice(2);

// Bootstrap manual sin NestFactory
(async () => {
  const configService = new ConfigService();
  const dataSource = createDataSource(configService);

  await dataSource.initialize();
  console.log('[Seeder] Conectado a la base de datos');

  await dataSource.query('TRUNCATE TABLE municipalities CASCADE');
  await dataSource.query('TRUNCATE TABLE departments CASCADE');

  if (args.includes('departments')) await seedDepartments(dataSource);
  if (args.includes('municipalities')) await seedMunicipalities(dataSource);

  await dataSource.destroy();
  console.log('[Seeder] Finalizado');
})();
