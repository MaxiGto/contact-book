import { DataSource } from 'typeorm';
import { Person, Phone, Address, PhoneType, ContactActivity } from '../entities';
import config, { Environment } from './config';

const { env } = config;

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: env === Environment.Test ? ':memory:' : './data/db.sqlite',
  entities: [Person, Phone, Address, PhoneType, ContactActivity],
  synchronize: true,
  logging: false,
});

export const clearDatabase = async () => {
  if (env === Environment.Production) return;
  const entities = AppDataSource.entityMetadatas;
  await Promise.all(
    entities.map(async (entity) => {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.clear();
    }),
  );
};
