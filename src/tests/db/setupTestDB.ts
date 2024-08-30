import { AppDataSource, clearDatabase } from '../../config/db';

export const setupTestDB = () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await clearDatabase();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
};
