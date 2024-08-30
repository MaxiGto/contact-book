import { AppDataSource } from '../config/db';
import { ContactActivity } from '../entities';
import { ContactActivityType } from '../entities/contactActivity.entity';
import { ICreateContactActivity } from '../interfaces/contactActivity.interfaces';
import { loadQuery } from '../utils/common.utils';
import { getSearchConditions } from '../utils/contactActivity.utils';
import { findOne } from './contact.service';

export const find = async (personId: number, type: ContactActivityType | undefined) => {
  const contact = await findOne({ id: personId });
  let query = AppDataSource.getRepository(ContactActivity).createQueryBuilder('activity');
  const searchConditions = getSearchConditions(personId, type);
  query = loadQuery<ContactActivity>(query, searchConditions);

  const contactActivities = await query.getMany();
  return {
    contact,
    contactActivities,
  };
};

export const create = async (createActivity: ICreateContactActivity): Promise<ContactActivity> => {
  const { personId, ...rest } = createActivity;
  const contact = await findOne({ id: personId });
  const contactActivityRepository = AppDataSource.getRepository(ContactActivity);
  const newActivity = contactActivityRepository.create({
    ...rest,
    person: contact,
  });
  await contactActivityRepository.save(newActivity);
  return newActivity;
};
