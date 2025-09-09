import { DataSource } from 'typeorm';
import { Stratum } from '../../stratum/entities/stratum.entity';

export default async function seedUsers(dataSource: DataSource) {
  const repo = dataSource.getRepository(Stratum);

  const data = [
    {
      name: 'Estrato uno',
    },
    {
      name: 'Estrato dos',
    },
    {
      name: 'Estrato tres',
    },
    {
      name: 'Estrato cuatro',
    },
    {
      name: 'Estrato cinco',
    },
    {
      name: 'Estrato seis',
    },
  ];

  for (const dept of data) {
    await repo.save(dept);
  }

  console.log('✅ [Seeder] Strata creados con éxito.');
}
