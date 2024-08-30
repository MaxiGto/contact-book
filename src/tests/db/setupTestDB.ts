import { AppDataSource } from '../../config/db';

export const setupTestDB = () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    const entities = AppDataSource.entityMetadatas;

    await Promise.all(
      entities.map((entity) => {
        const repository = AppDataSource.getRepository(entity.name);
        return repository.clear();
      }),
    );
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });
};
