import { DataSource } from 'typeorm';
import { Person, Phone, Address, PhoneType, ContactActivity } from '../entities';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env['NODE_ENV'] === 'test' ? './data/db-test.sqlite' : './data/db.sqlite',
  entities: [Person, Phone, Address, PhoneType, ContactActivity],
  synchronize: true,
  logging: false,
});
